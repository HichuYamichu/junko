const {
  AkairoClient,
  CommandHandler,
  InhibitorHandler,
  ListenerHandler
} = require('discord-akairo');
const YouTube = require('simple-youtube-api');
const SpotifyWebApi = require('spotify-web-api-node');
const { join } = require('path');
const protoPath = join(__dirname, '../..', 'proto/fetcher.proto');
const Database = require('../structs/Database');
const Store = require('../structs/Store');
const RPCHandler = require('../structs/RPCHandler');
const Logger = require('../structs/Logger');
const replies = require('../util/replies');
const { collectDefaultMetrics, Counter, Histogram, register } = require('prom-client');
const { createServer } = require('http');
const { parse } = require('url');
collectDefaultMetrics();

const Mali = require('mali');

module.exports = class JunkoClient extends AkairoClient {
  constructor(config) {
    super(
      {
        ownerID: config.ownerID
      },
      {
        messageCacheMaxSize: 50,
        messageCacheLifetime: 60 * 15,
        messageSweepInterval: 60 * 45,
        disableEveryone: true,
        disabledEvents: ['TYPING_START']
      }
    );

    this.config = config;

    this.logger = Logger;

    this.store = Store;

    if (process.env.YT_KEY) {
      this.yt = new YouTube(process.env.YT_KEY);
    }

    if (process.env.SPOTIFY_ID && process.env.SPOTIFY_SECRET) {
      this.spotify = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_ID,
        clientSecret: process.env.SPOTIFY_SECRET
      });
    }

    this.rpc = new Mali(protoPath, 'GuildFetcher');

    this.say = ctx => {
      ctx.res = null;
    };

    this.prometheus = {
      commandCounter: new Counter({
        name: 'total_commands_used',
        help: 'Total number of used commands'
      }),
      grpcServerStartedTotal: new Counter({
        labelNames: ['grpc_type', 'grpc_service', 'grpc_method'],
        name: 'grpc_server_started_total',
        help: 'Total number of RPCs started.'
      }),
      grpcServerHandledTotal: new Counter({
        labelNames: ['grpc_type', 'grpc_service', 'grpc_method', 'grpc_code'],
        name: 'grpc_server_handled_total',
        help: 'Total number of RPCs completed.'
      }),
      grpcServerHandleTime: new Histogram({
        labelNames: ['grpc_type', 'grpc_service', 'grpc_method', 'grpc_code'],
        name: 'grpc_server_handle_time',
        buckets: [0.1, 5, 15, 50, 100, 500],
        help: 'Response latency of gRPC.'
      }),
      register
    };

    this.promSrv = createServer((req, res) => {
      if (parse(req.url).pathname === '/metrics') {
        res.writeHead(200, { 'Content-Type': this.prometheus.register.contentType });
        res.write(this.prometheus.register.metrics());
      }
      res.end();
    });

    this.commandHandler = new CommandHandler(this, {
      directory: join(__dirname, '..', 'commands'),
      prefix: msg => msg.guild ? this.store.getGuildPrefix(msg.guild) : '!',
      aliasReplacement: /-/g,
      allowMention: true,
      commandUtil: true,
      commandUtilLifetime: 3e5,
      defaultCooldown: 3000,
      fetchMembers: true,
      argumentDefaults: {
        prompt: {
          modifyStart: (_, str) =>
            `${str}\nListening for input! Type \`cancel\` to cancel the command.`,
          modifyRetry: (_, str) => `${str}\nRetrying now! Type \`cancel\` to cancel the command.`,
          timeout: msg => this.getReply(msg, 'timeout'),
          ended: msg => this.getReply(msg, 'ended'),
          cancel: 'The command has been cancelled.',
          retries: 3,
          time: 20000
        },
        otherwise: ''
      }
    });

    this.inhibitorHandler = new InhibitorHandler(this, {
      directory: join(__dirname, '..', 'inhibitors')
    });

    this.listenerHandler = new ListenerHandler(this, {
      directory: join(__dirname, '..', 'listeners')
    });
  }

  async getReply(message, category, appendText) {
    const preset = await this.store.getGuildPreset(message.guild);
    let text =
      replies[preset][category][Math.floor(Math.random() * replies[preset][category].length)];
    appendText ? text += appendText : '';
    return text;
  }

  async init() {
    await Database.init();

    this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      inhibitorHandler: this.inhibitorHandler,
      listenerHandler: this.listenerHandler
    });

    this.commandHandler.loadAll();
    this.inhibitorHandler.loadAll();
    this.listenerHandler.loadAll();

    if (this.spotify) {
      const { body } = await this.spotify.clientCredentialsGrant();
      this.spotify.setAccessToken(body.access_token);
    } else {
      this.commandHandler.findCategory('spotify').removeAll();
    }

    this.rpc.use(Object.assign({}, new RPCHandler(this)));
    this.rpc.start('0.0.0.0:50051');

    this.promSrv.listen(5000);
  }

  async start() {
    await this.init();
    this.login(this.config.token);
  }
};

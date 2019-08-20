const {
  AkairoClient,
  CommandHandler,
  InhibitorHandler,
  ListenerHandler
} = require('discord-akairo');
const { replies } = require('../util/replies');
const createLogger = require('../logger/logger');
const YouTube = require('simple-youtube-api');
const SpotifyWebApi = require('spotify-web-api-node');
const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis);
const { join } = require('path');
const protoPath = join(__dirname, '../..', 'proto/fetcher.proto');
const grpc = require('grpc');
const interceptors = require('@hpidcock/node-grpc-interceptors');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(protoPath);
const serviceDeff = grpc.loadPackageDefinition(packageDefinition).fetcher;
const RPCHandler = require('../grpc/handler');
const { collectDefaultMetrics, Counter, Histogram, register } = require('prom-client');
const { createServer } = require('http');
const { parse } = require('url');
collectDefaultMetrics();

module.exports = class extends AkairoClient {
  constructor(config) {
    super(
      {
        ownerID: config.ownerID
      },
      {
        messageCacheMaxSize: 50,
        messageCacheLifetime: 60 * 15,
        messageSweepInterval: 60 * 45,
        fetchAllMembers: true,
        disableEveryone: true,
        disabledEvents: ['TYPING_START']
      }
    );

    this.config = config;

    this.replies = replies;

    this.color = '#fc2041';

    this.store = redis.createClient({ host: config.redisURI });

    this.logger = createLogger(this.store);

    this.yt = new YouTube(config.YouTubeSecret);

    this.spotify = new SpotifyWebApi({
      clientId: config.SpotifyID,
      clientSecret: config.SpotifySecret
    });

    this.rpc = interceptors.serverProxy(new grpc.Server());

    this.RPCHandler = new RPCHandler(this);

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
      prefix: msg => this._getPrefix(msg),
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
          timeout: this.replies.get('timeout'),
          ended: this.replies.get('ended'),
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

  async _getPrefix(msg) {
    if (msg.guild) {
      const token = await this.store.hgetAsync(msg.guild.id, 'prefix');
      if (token) return token;
    }
    return '!';
  }

  async _init() {
    const { body } = await this.spotify.clientCredentialsGrant();
    this.spotify.setAccessToken(body.access_token);

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

    this.rpc.use(this.RPCHandler.promMiddleware);
    this.rpc.addService(serviceDeff.GuildFetcher.service, this.RPCHandler);
    this.rpc.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    this.rpc.start();

    this.promSrv.listen(5000);
  }

  async start() {
    await this._init();
    this.login(this.config.token);
  }
};

const {
  AkairoClient,
  CommandHandler,
  InhibitorHandler,
  ListenerHandler
} = require('discord-akairo');
const YouTube = require('simple-youtube-api');
const SpotifyWebApi = require('spotify-web-api-node');
const { join } = require('path');
const Database = require('../structs/Database');
const Store = require('../structs/Store');
const RPCServer = require('../structs/RPCServer');
const Logger = require('../structs/Logger');
const Prometheus = require('../structs/Prometheus');
const replies = require('../util/replies');

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

    this.APIs = {};

    this.store = new Store();

    this.prometheus = new Prometheus();

    this.rpc = new RPCServer(this);

    this.commandHandler = new CommandHandler(this, {
      directory: join(__dirname, '..', 'commands'),
      prefix: msg => this.store.get(msg.guild, 'prefix', this.config.defaultPrefix),
      aliasReplacement: /-/g,
      allowMention: true,
      commandUtil: true,
      commandUtilLifetime: 3e5,
      defaultCooldown: 3000,
      fetchMembers: true,
      argumentDefaults: {
        prompt: {
          modifyStart: (msg, text) =>
            `${msg.author} **//** ${text}\nType \`cancel\` to cancel this command.`,
          modifyRetry: (msg, text) =>
            `${msg.author} **//** ${text}\nType \`cancel\` to cancel this command.`,
          timeout: async msg => `${msg.author} **//** ${await this.getReply(msg, 'timeout')}`,
          ended: async msg =>
            `${msg.author} **//** ${await this.getReply(
              msg,
              'ended'
            )}\nCommand has been cancelled.`,
          cancel: msg => `${msg.author} **//** Command has been cancelled.`,
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

  async getReply(message, category) {
    const preset = await this.store.get(message.guild, 'preset', this.config.defaultPreset);
    return replies[preset][category][Math.floor(Math.random() * replies[preset][category].length)];
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

    if (process.env.YT_KEY) {
      this.APIs.yt = new YouTube(process.env.YT_KEY);
    }

    if (process.env.SPOTIFY_ID && process.env.SPOTIFY_SECRET) {
      this.APIs.spotify = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_ID,
        clientSecret: process.env.SPOTIFY_SECRET
      });
      const { body } = await this.APIs.spotify.clientCredentialsGrant();
      this.APIs.spotify.setAccessToken(body.access_token);
    } else {
      this.commandHandler.findCategory('spotify').removeAll();
    }

    this.rpc.listen();
    this.prometheus.listen();
  }

  async start() {
    await this.init();
    this.login(this.config.token);
  }
};

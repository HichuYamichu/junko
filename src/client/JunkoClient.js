const {
  AkairoClient,
  CommandHandler,
  InhibitorHandler,
  ListenerHandler
} = require('discord-akairo');
const { replies } = require('../util/replies');
const { join } = require('path');
const logger = require('../util/logger');
const YouTube = require('simple-youtube-api');
const SpotifyWebApi = require('spotify-web-api-node');
const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis);

module.exports = class extends AkairoClient {
  constructor(config) {
    super(
      {
        ownerID: config.ownerID
      },
      {
        disableEveryone: true,
        disabledEvents: ['TYPING_START']
      }
    );
    this.config = config;

    this.logger = logger;

    this.replies = replies;

    this.color = '#fc2041';

    this.store = redis.createClient({ host: config.redisURI });

    this.yt = new YouTube(config.YouTubeSecret);

    this.spotify = new SpotifyWebApi({
      clientId: config.SpotifyID,
      clientSecret: config.SpotifySecret
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
          modifyStart: (_, str) => `${str}\nListening for input! Type \`cancel\` to cancel the command.`,
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
  }

  async start() {
    await this._init();
    this.login(this.config.token);
  }
};

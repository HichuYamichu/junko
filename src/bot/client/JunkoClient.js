const {
  AkairoClient,
  CommandHandler,
  InhibitorHandler,
  ListenerHandler
} = require('discord-akairo');
const { join } = require('path');
const Logger = require('../structs/Logger');
const Database = require('../structs/Database');
const Store = require('../structs/Store');
const Prometheus = require('../structs/Prometheus');
const RPCServer = require('../structs/RPCServer');
const APIManager = require('../structs/APIManager');
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

    this.store = new Store();

    this.prometheus = new Prometheus();

    this.rpc = new RPCServer(this);

    this.APIManager = APIManager;

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
          timeout: async msg => {
            const reply = await this.getReply(msg, 'timeout');
            return `${msg.author} **//** ${reply}`;
          },
          ended: async msg => {
            const reply = await this.getReply(msg, 'ended');
            return `${msg.author} **//** ${reply}\nCommand has been cancelled.`;
          },
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
    await APIManager.init();

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

    this.rpc.listen();
    this.prometheus.listen();
  }

  async start() {
    await this.init();
    this.login(this.config.token);
  }
};

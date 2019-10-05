import { Message } from 'discord.js';
import { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } from 'discord-akairo';
import { Connection } from 'typeorm';
import { join } from 'path';
import Database from '../structs/Database';
import { Settings } from '../models/Settings';
import SettingsProvider from '../structs/SettingsProvider';
import Prometheus from '../structs/Prometheus';
import RPCServer from '../structs/RPCServer';
import APIManager from '../structs/APIManager';
import replies from '../util/replies';

interface JunkoConf {
  ownerID: string;
  token: string;
  color: string;
  defaultPrefix: string;
  defaultPreset: string;
}

declare module 'discord-akairo' {
  interface AkairoClient {
    config: JunkoConf;
    db: Connection;
    settings: SettingsProvider;
    prometheus: Prometheus;
    rpc: RPCServer;
    APIManager: APIManager;
    commandHandler: CommandHandler;
    inhibitorHandler: InhibitorHandler;
    listenerHandler: ListenerHandler;
    getReply(message: Message, category: string): Promise<string>;
  }
}

export default class JunkoClient extends AkairoClient {
  public constructor(config: JunkoConf) {
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

    this.prometheus = new Prometheus();

    this.rpc = new RPCServer(this);

    this.APIManager = new APIManager();

    this.commandHandler = new CommandHandler(this, {
      directory: join(__dirname, '..', 'commands'),
      prefix: (msg: Message) => this.settings.get(msg.guild!, 'prefix', this.config.defaultPrefix),
      aliasReplacement: /-/g,
      allowMention: true,
      commandUtil: true,
      commandUtilLifetime: 3e5,
      defaultCooldown: 3000,
      fetchMembers: true,
      argumentDefaults: {
        prompt: {
          modifyStart: (msg: Message, text: string) =>
            `${msg.author} **//** ${text}\nType \`cancel\` to cancel this command.`,
          modifyRetry: (msg: Message, text: string) =>
            `${msg.author} **//** ${text}\nType \`cancel\` to cancel this command.`,
          timeout: async (msg: Message) => {
            const reply = await this.getReply(msg, 'timeout');
            return `${msg.author} **//** ${reply}`;
          },
          ended: async (msg: Message) => {
            const reply = await this.getReply(msg, 'ended');
            return `${msg.author} **//** ${reply}\nCommand has been cancelled.`;
          },
          cancel: (msg: Message) => `${msg.author} **//** Command has been cancelled.`,
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

  public async getReply(message: Message, category: string): Promise<string> {
    const preset = await this.settings.get(message.guild!, 'preset', this.config.defaultPreset);
    // @ts-ignore
    return replies[preset][category][Math.floor(Math.random() * replies[preset][category].length)];
  }

  private async init() {
    this.db = Database.get('junko');
    await this.db.connect();
    this.settings = new SettingsProvider(this.db.getRepository(Settings));
    await this.APIManager.init();

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

  public async start() {
    await this.init();
    this.login(this.config.token);
  }
}

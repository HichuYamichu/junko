import { Message } from 'discord.js';
import {
  AkairoClient,
  CommandHandler,
  InhibitorHandler,
  ListenerHandler
} from 'discord-akairo';
import { Connection } from 'typeorm';
import { join } from 'path';
import { Server, ServerCredentials } from 'grpc';
import Database from '../structs/Database';
import { Settings } from '../models/Settings';
import { SettingsProvider } from '../structs/SettingsProvider';
import { Prometheus } from '../structs/Prometheus';
import { RPCHandler } from '../structs/RPCHandler';
import { APIManager } from '../structs/APIManager';
import { ReplyManager } from '../structs/ReplyMenager';
import { Logger } from '../structs/Logger';
import { JunkoService } from '../generated/junko_grpc_pb';

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
    rpcServer: Server;
    replyManager: ReplyManager;
    apiManager: APIManager;
    logger: Logger;
    commandHandler: CommandHandler;
  }
}

export default class JunkoClient extends AkairoClient {
  public config: JunkoConf;

  public prometheus = new Prometheus();

  public rpcServer = new Server();

  public replyManager = new ReplyManager(this);

  public apiManager = new APIManager(this);

  public logger = new Logger();

  public commandHandler: CommandHandler = new CommandHandler(this, {
    directory: join(__dirname, '..', 'commands'),
    prefix: (msg: Message) =>
      this.settings.get(msg.guild, 'prefix', this.config.defaultPrefix),
    aliasReplacement: /-/g,
    allowMention: true,
    commandUtil: true,
    commandUtilLifetime: 3e5,
    defaultCooldown: 3000,
    argumentDefaults: {
      prompt: {
        modifyStart: (msg: Message, text: string) =>
          this.replyManager.modifyStart(msg, text),
        modifyRetry: (msg: Message, text: string) =>
          this.replyManager.modifyRetry(msg, text),
        timeout: (msg: Message) => this.replyManager.timeout(msg),
        ended: (msg: Message) => this.replyManager.ended(msg),
        cancel: (msg: Message) => this.replyManager.cancel(msg),
        retries: 3,
        time: 20000
      },
      otherwise: ''
    }
  });

  public inhibitorHandler = new InhibitorHandler(this, {
    directory: join(__dirname, '..', 'inhibitors')
  });

  public listenerHandler = new ListenerHandler(this, {
    directory: join(__dirname, '..', 'listeners')
  });

  public constructor(config: JunkoConf) {
    super({ ownerID: config.ownerID });
    this.config = config;
  }

  private async init() {
    this.db = await Database.get('junko').connect();
    this.settings = new SettingsProvider(this.db.getRepository(Settings));
    this.apiManager.init();

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

    this.rpcServer.addService(JunkoService, new RPCHandler(this));
    this.rpcServer.bind(
      process.env.RPC_ADDR!,
      ServerCredentials.createInsecure()
    );
    this.rpcServer.start();
    this.prometheus.listen();
  }

  public async start() {
    await this.init();
    this.login(this.config.token);
  }
}

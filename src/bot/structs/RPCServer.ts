import JunkoClient from '../client/JunkoClient';
import * as Mali from 'mali';
import { join } from 'path';
const protoPath = join(__dirname, '../../..', 'proto/services.proto');

export default class RPCServer extends Mali {
  public client: JunkoClient;
  public fetchCategories: (ctx: Mali.Context) => void;
  public fetchCommands: (ctx: Mali.Context) => void;
  public fetchDescription: (ctx: Mali.Context) => void;

  public constructor(client: JunkoClient) {
    super(protoPath, 'DescriptionFetcher');
    this.client = client;

    this.fetchCategories = (ctx: Mali.Context) => {
      const categories = this.client.commandHandler.categories;
      const res = categories.keyArray();
      ctx.res = { categoryNames: res };
    };

    this.fetchCommands = (ctx: Mali.Context) => {
      const category = this.client.commandHandler.findCategory(ctx.req.categoryName);
      const commandNames = category.keyArray();
      ctx.res = { commandNames };
    };

    this.fetchDescription = (ctx: Mali.Context) => {
      const cmd = this.client.commandHandler.findCommand(ctx.req.commandName);
      if (!cmd || !cmd.description) {
        ctx.res = {};
        return;
      }
      ctx.res = cmd.description;
    };
  }

  private init() {
    this.use(this.client.prometheus.rpcMiddleware);
    this.use({ fetchCategories: this.fetchCategories });
    this.use({ fetchCommands: this.fetchCommands });
    this.use({ fetchDescription: this.fetchDescription });
  }

  public listen() {
    this.init();
    this.start(process.env.RPC_ADDR!);
  }
}

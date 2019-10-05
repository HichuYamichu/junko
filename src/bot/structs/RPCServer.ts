import JunkoClient from '../client/JunkoClient';
import * as Mali from 'mali';
import { join } from 'path';
const protoPath = join(__dirname, '../../..', 'proto/services.proto');

export default class RPCServer extends Mali {
  public client: JunkoClient;
  public fetchGuilds: (ctx: Mali.Context) => void;
  public fetchGuild: (ctx: Mali.Context) => void;
  public fetchChannel: (ctx: Mali.Context) => void;
  public fetchMember: (ctx: Mali.Context) => void;
  public fetchRole: (ctx: Mali.Context) => void;
  public fetchUser: (ctx: Mali.Context) => void;
  public say: (ctx: Mali.Context) => void;

  public constructor(client: JunkoClient) {
    super(protoPath, 'GuildFetcher');
    this.client = client;

    this.fetchGuilds = (ctx: Mali.Context) => {
      const res: { id: string; name: string; icon: string | null }[] = [];
      this.client.guilds.each(guild => {
        res.push({ id: guild.id, name: guild.name, icon: guild.icon });
      });
      ctx.res = { guilds: res };
    };

    this.fetchGuild = (ctx: Mali.Context) => {
      const guild = this.client.guilds.get(ctx.req.ID);
      const res = guild!.toJSON();
      ctx.res = res;
    };

    this.fetchChannel = (ctx: Mali.Context) => {
      const channel = this.client.channels.get(ctx.req.ID);
      const res = channel!.toJSON();
      ctx.res = res;
    };

    this.fetchMember = (ctx: Mali.Context) => {
      const member = this.client.guilds.get(ctx.req.GuildID)!.members.get(ctx.req.ID);
      const res = member!.toJSON();
      ctx.res = res;
    };

    this.fetchRole = (ctx: Mali.Context) => {
      const role = this.client.guilds.get(ctx.req.GuildID)!.roles.get(ctx.req.ID);
      const res = role!.toJSON();
      ctx.res = res;
    };

    this.fetchUser = (ctx: Mali.Context) => {
      const user = this.client.users.get(ctx.req.ID);
      const res = user!.toJSON();
      ctx.res = res;
    };

    this.say = (ctx: Mali.Context) => {
      this.client.commandHandler.runCommand(
        // @ts-ignore
        null,
        this.client.commandHandler.findCommand('say'),
        ctx.req
      );
      ctx.res = null;
    };
  }

  private init() {
    this.use(this.client.prometheus.rpcMiddleware);
    this.use({ fetchGuilds: this.fetchGuilds });
    this.use({ fetchGuild: this.fetchGuild });
    this.use({ fetchChannel: this.fetchChannel });
    this.use({ fetchMember: this.fetchMember });
    this.use({ fetchRole: this.fetchRole });
    this.use({ fetchUser: this.fetchUser });
    this.use({ say: this.say });
  }

  public listen() {
    this.init();
    this.start('0.0.0.0:50051');
  }
}

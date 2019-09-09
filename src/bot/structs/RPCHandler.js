module.exports = class RPCHandler {
  constructor(client) {
    this.fetchGuilds = ctx => {
      const res = [];
      client.guilds.each(guild => {
        res.push({ id: guild.id, name: guild.name, icon: guild.icon });
      });
      ctx.res = { guilds: res };
    };

    this.fetchGuild = ctx => {
      const guild = client.guilds.get(ctx.req.ID);
      const res = guild.toJSON();
      ctx.res = res;
    };

    this.fetchChannels = ctx => {
      const res = [];
      for (const id of ctx.req.IDs) {
        res.push(client.channels.get(id).toJSON());
      }
      ctx.res = { channels: res };
    };

    this.fetchChannel = ctx => {
      const channel = client.channels.get(ctx.req.ID);
      const res = channel.toJSON();
      ctx.res = res;
    };

    this.fetchMembers = ctx => {
      const res = [];
      for (const id of ctx.req.IDs) {
        res.push(
          client.guilds
            .get(ctx.req.guildID)
            .members.get(id)
            .toJSON()
        );
      }
      ctx.res = { members: res };
    };

    this.fetchMember = ctx => {
      const member = client.guilds.get(ctx.req.guildID).members.get(ctx.req.ID);
      const res = member.toJSON();
      ctx.res = { members: res };
    };

    this.fetchRoles = ctx => {
      const res = [];
      for (const id of ctx.req.IDs) {
        res.push(
          client.guilds
            .get(ctx.req.guildID)
            .roles.get(id)
            .toJSON()
        );
      }
      ctx.res = { roles: res };
    };

    this.fetchRole = ctx => {
      const role = client.guilds.get(ctx.req.guildID).roles.get(ctx.req.ID);
      const res = role.toJSON();
      ctx.res = { roles: res };
    };

    this.fetchUsers = ctx => {
      const res = [];
      for (const id of ctx.req.IDs) {
        res.push(client.users.get(id).toJSON());
      }
      ctx.res = { users: res };
    };

    this.fetchUser = ctx => {
      const user = client.users.get(ctx.req.ID);
      const res = user.toJSON();
      ctx.res = res;
    };

    this.say = ctx => {
      client.commandHandler.runCommand(null, client.commandHandler.findCommand('say'), ctx.req);
      ctx.res = null;
    };
  }
};

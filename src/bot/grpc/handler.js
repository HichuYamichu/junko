const { status } = require('grpc');

const statusCodes = Object.keys(status).reduce((acc, value, i) => {
  acc[status[value]] = value;
  return acc;
}, {});

class RPCHandler {
  constructor(client) {
    this.client = client;

    this.fetchGuilds = (call, callback) => {
      const res = [];
      this.client.guilds.each(guild => {
        res.push({ id: guild.id, name: guild.name, icon: guild.icon });
      });
      callback(null, { guilds: res });
    };

    this.fetchGuild = (call, callback) => {
      const guild = this.client.guilds.get(call.request.ID);
      const res = guild.toJSON();
      callback(null, res);
    };

    this.fetchChannels = (call, callback) => {
      const res = [];
      for (const id of call.request.IDs) {
        res.push(this.client.channels.get(id).toJSON());
      }
      callback(null, { channels: res });
    };

    this.fetchChannel = (call, callback) => {
      const channel = this.client.channels.get(call.request.ID);
      const res = channel.toJSON();
      callback(null, res);
    };

    this.fetchMembers = (call, callback) => {
      const res = [];
      for (const id of call.request.IDs) {
        res.push(
          this.client.guilds
            .get(call.request.guildID)
            .members.get(id)
            .toJSON()
        );
      }
      callback(null, { members: res });
    };

    this.fetchMember = (call, callback) => {
      const member = this.client.guilds.get(call.request.guildID).members.get(call.request.ID);
      const res = member.toJSON();
      callback(null, { members: res });
    };

    this.fetchRoles = (call, callback) => {
      const res = [];
      for (const id of call.request.IDs) {
        res.push(
          this.client.guilds
            .get(call.request.guildID)
            .roles.get(id)
            .toJSON()
        );
      }
      callback(null, { roles: res });
    };

    this.fetchRole = (call, callback) => {
      const role = this.client.guilds.get(call.request.guildID).roles.get(call.request.ID);
      const res = role.toJSON();
      callback(null, { roles: res });
    };

    this.fetchUsers = (call, callback) => {
      const res = [];
      for (const id of call.request.IDs) {
        res.push(this.client.users.get(id).toJSON());
      }
      callback(null, { users: res });
    };

    this.fetchUser = (call, callback) => {
      const user = this.client.users.get(call.request.ID);
      const res = user.toJSON();
      callback(null, res);
    };

    this.say = (call, callback) => {
      this.client.commandHandler.runCommand(
        null,
        this.client.commandHandler.findCommand('say'),
        call.request
      );
      callback(null, null);
    };

    this.promMiddleware = async (ctx, next) => {
      const startEpoch = Date.now();
      this.client.prometheus.grpcServerStartedTotal
        .labels(ctx.service.type, ctx.service.name, ctx.service.method)
        .inc();

      await next();

      this.client.prometheus.grpcServerHandledTotal
        .labels(
          ctx.service.type,
          ctx.service.name,
          ctx.service.method,
          statusCodes[ctx.status.code]
        )
        .inc();

      this.client.prometheus.grpcServerHandleTime
        .labels(
          ctx.service.type,
          ctx.service.name,
          ctx.service.method,
          statusCodes[ctx.status.code]
        )
        .observe(Date.now() - startEpoch);
    };
  }
}

module.exports = RPCHandler;

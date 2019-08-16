module.exports = client => ({
  fetchGuilds: (call, callback) => {
    const res = [];
    client.guilds.each(guild => {
      res.push({ id: guild.id, name: guild.name, icon: guild.icon });
    });
    callback(null, { guilds: res });
  },

  fetchGuild: (call, callback) => {
    const guild = client.guilds.get(call.request.ID);
    const res = guild.toJSON();
    callback(null, res);
  },

  fetchChannels: (call, callback) => {
    const res = [];
    for (const id of call.request.IDs) {
      res.push(client.channels.get(id).toJSON());
    }
    callback(null, { channels: res });
  },

  fetchChannel: (call, callback) => {
    const channel = client.channels.get(call.request.ID);
    const res = channel.toJSON();
    callback(null, res);
  },

  fetchMembers: (call, callback) => {
    const res = [];
    for (const id of call.request.IDs) {
      res.push(
        client.guilds
          .get(call.request.guildID)
          .members.get(id)
          .toJSON()
      );
    }
    callback(null, { members: res });
  },

  fetchMember: (call, callback) => {
    const member = client.guilds.get(call.request.guildID).members.get(call.request.ID);
    const res = member.toJSON();
    callback(null, { members: res });
  },

  fetchRoles: (call, callback) => {
    const res = [];
    for (const id of call.request.IDs) {
      res.push(
        client.guilds
          .get(call.request.guildID)
          .roles.get(id)
          .toJSON()
      );
    }
    callback(null, { roles: res });
  },

  fetchRole: (call, callback) => {
    const role = client.guilds.get(call.request.guildID).roles.get(call.request.ID);
    const res = role.toJSON();
    callback(null, { roles: res });
  },

  fetchUsers: (call, callback) => {
    const res = [];
    for (const id of call.request.IDs) {
      res.push(client.users.get(id).toJSON());
    }
    callback(null, { users: res });
  },

  fetchUser: (call, callback) => {
    const user = client.users.get(call.request.ID);
    const res = user.toJSON();
    callback(null, res);
  },

  say: (call, callback) => {
    client.commandHandler.runCommand(null, client.commandHandler.findCommand('say'), call.request);
    callback(null, null);
  }
});

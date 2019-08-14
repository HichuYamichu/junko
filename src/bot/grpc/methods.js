const compose = require('./responceComposer');
const parse = require('./fieldParser');

module.exports = client => ({
  fetchGuilds: (call, callback) => {
    const res = [];
    let guildIDs = call.request.id;
    if (!guildIDs) {
      guildIDs = client.guilds.map(g => g.id);
    }
    for (const id of guildIDs) {
      const base = client.guilds.get(id);
      const requstedFields = parse(call.request.gql);
      const guild = {};
      compose(
        base,
        guild,
        requstedFields
      );
      res.push(guild);
    }
    callback(null, { guilds: res });
  },

  fetchGuild: async (call, callback) => {
    const base = await client.guilds.get(call.request.id[0]).fetch();
    const requstedFields = parse(call.request.gql);
    const guild = {};
    compose(
      base,
      guild,
      requstedFields
    );
    callback(null, guild);
  },

  say: (call, callback) => {
    client.commandHandler.runCommand(null, client.commandHandler.findCommand('say'), call.request);
    callback(null, null);
  }
});

const compose = require('./responceComposer');
const parse = require('./fieldParser');

module.exports = client => ({
  fetchGuilds: async (call, callback) => {
    const res = [];
    let guildIDs = call.request.id;
    if (!guildIDs) {
      guildIDs = client.guilds.map(g => g.id);
    }
    for (const id of guildIDs) {
      const base = await client.guilds.get(id).fetch();
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
  say: (call, callback) => {
    client.commandHandler.runCommand(null, client.commandHandler.findCommand('say'), call.request);
    callback(null, null);
  }
});

const compose = require('./responceComposer');
const parse = require('./fieldParser');

module.exports = client => ({
  fetchGuilds: (call, callback) => {
    callback(null, { guilds: [...client.guilds.values()].map(g => ({ id: g.id, name: g.name })) });
  },
  fetchGuild: async (call, callback) => {
    const guild = await client.guilds.get(call.request.id).fetch();
    const requstedFields = parse(call.request.gql);
    const res = {};
    compose(guild, res, requstedFields);

    callback(null, res);
  },
  say: (call, callback) => {
    client.commandHandler.runCommand(null, client.commandHandler.findCommand('say'), call.request);
    callback(null, null);
  }
});

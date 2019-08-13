const gql = require('graphql-tag');
// const { parse } = require('graphql');

module.exports = client => ({
  fetchGuilds: (call, callback) => {
    // console.log(parse(call.request.gql).definitions[0].selectionSet.selections[0].selectionSet.selections);
    const query = gql`${call.request.gql}`.definitions[0].selectionSet.selections[0].selectionSet.selections;
    console.log(query);
    callback(null, { guilds: [...client.guilds.values()].map(g => ({ id: g.id, name: g.name })) });
  },
  fetchGuild: async (call, callback) => {
    // console.log(gql`call`)
    const guild = await client.guilds.get(call.request.id).fetch();
    const cpy = JSON.parse(JSON.stringify(guild));
    cpy.createdAt = guild.createdAt;
    cpy.roles = [...guild.roles.values()];
    cpy.roles.forEach((role, i) => {
      role.permissions = [...guild.members.values()][i].permissions.bitfield;
    });
    cpy.members = [...guild.members.values()];
    cpy.members.forEach((member, i) => {
      member.joinedAt = [...guild.members.values()][i].joinedAt;
      member.user.avatar = member.user.displayAvatarURL();
    });
    cpy.channels = [...guild.channels.values()];
    cpy.channels.forEach((channels, i) => {
      channels.parentID = [...guild.channels.values()][i].parentID;
    });
    callback(null, cpy);
  },
  say: (call, callback) => {
    client.commandHandler.runCommand(null, client.commandHandler.findCommand('say'), call.request);
    callback(null, null);
  }
});

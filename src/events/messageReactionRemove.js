module.exports = async (client, messageReaction, user) => {
  if (messageReaction.message.partial) await messageReaction.message.fetch();
  if (user.bot) return;
  const matchMessage = await client.store.hgetAsync(
    messageReaction.message.guild.id,
    `roleMsg-${messageReaction.message.id}`
  );
  if (!matchMessage) {
    return;
  }
  const roleId = messageReaction.message.guild.roles.find(
    role => role.name === messageReaction._emoji.name
  ).id;
  messageReaction._emoji.name;

  const fetchedUser = messageReaction.message.guild.members.get(user.id);
  const newRoleSet = fetchedUser._roles.filter(role => role !== roleId);
  fetchedUser.edit({ roles: newRoleSet });
};

module.exports = async (client, messageReaction, user) => {
  if (messageReaction.message.partial) await messageReaction.message.fetch();
  if (user.bot) return;
  const matchMessage =
    await client.store.getAsync(messageReaction.message.guild.id) === messageReaction.message.id;
  if (!matchMessage) {
    return;
  }
  const roleId = messageReaction.message.guild.roles.find(
    role => role.name === messageReaction._emoji.name
  ).id;
  messageReaction._emoji.name;

  const fetchedUser = messageReaction.message.guild.members.get(user.id);
  fetchedUser._roles.push(roleId);
  fetchedUser.edit({ roles: fetchedUser._roles });
};

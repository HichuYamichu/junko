module.exports = async (client, messageReaction, user) => {
  if (messageReaction.message.partial) await messageReaction.message.fetch();
  if (user.bot) return;
  const roleMessage = await client.store.hgetAsync(
    messageReaction.message.guild.id,
    `roleMsg-${messageReaction.message.id}`
  );
  if (roleMessage) {
    const data = JSON.parse(roleMessage);
    const match = data.find(
      emoji =>
        emoji.startsWith(messageReaction._emoji.id) || emoji.startsWith(messageReaction._emoji)
    );
    const roleId = match.split(' ').pop();

    const fetchedUser = messageReaction.message.guild.members.get(user.id);
    const newRoleSet = fetchedUser._roles.filter(role => role !== roleId);
    fetchedUser.edit({ roles: newRoleSet });
  }
};

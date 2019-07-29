module.exports = async (client, messageReaction, user) => {
  if (messageReaction.message.partial) await messageReaction.message.fetch();
  if (user.bot) return;
  const roleMessage = await client.store.hgetAsync(
    messageReaction.message.guild.id,
    `roleMsg-${messageReaction.message.id}`
  );
  console.log(messageReaction);
  if (roleMessage) {
    const data = JSON.parse(roleMessage);
    const match = data.find(
      emoji =>
        emoji.startsWith(messageReaction._emoji.id) || emoji.startsWith(messageReaction._emoji)
    );
    if (!match) return;
    const roleId = match.split(' ').pop();

    const fetchedUser = messageReaction.message.guild.members.get(user.id);
    if (fetchedUser._roles.some(r => r === roleId)) return;
    fetchedUser._roles.push(roleId);
    fetchedUser.edit({ roles: fetchedUser._roles });
  } else if (
    messageReaction._emoji.name ===
    await client.store.hgetAsync(messageReaction.message.guild.id, 'AutoPinEmoji')
  ) {
    if (messageReaction.message.pinned) return;
    const threshold = await client.store.hgetAsync(messageReaction.message.guild.id, 'AutoPinThreshold');
    if (messageReaction.message.reactions.size >= threshold) {
      messageReaction.message.pin();
    }
  }
};

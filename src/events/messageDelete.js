module.exports = async (client, message) => {
  if (message.content.startsWith('Rect with right emoji to obtain corresponding role')) {
    client.store.hdel(message.guild.id, `roleMsg-${message.id}`);
  }
};

module.exports = async (client, message) => {
  client.store.hdel(message.guild.id, `roleMsg-${message.id}`);
};

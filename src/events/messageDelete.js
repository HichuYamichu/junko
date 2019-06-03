module.exports = async (client, message) => {
  if (message.partial) message.fetch();
  client.store.hdel(message.guild.id, message.id);
};

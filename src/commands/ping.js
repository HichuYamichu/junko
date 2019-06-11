module.exports = {
  name: 'ping',
  description: 'Ping!',
  args: 0,
  usage: '<nil>',
  guildOnly: true,
  cooldown: 1,
  aliases: [],
  permissionLVL: 0,
  async execute(message, args) {
    const msg = await message.channel.send('Ping?');
    msg.edit(
      `Pong! Latency is ${msg.createdTimestamp -
        message.createdTimestamp}ms. API Latency is ${Math.round(message.client.ws.ping)}ms`
    );
  }
};

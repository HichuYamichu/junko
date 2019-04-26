module.exports = {
  name: 'ping',
  description: 'Ping!',
  args: false,
  usage: '<user> <role>',
  guildOnly: true,
  cooldown: 1,
  async execute(message, args) {
    const m = await message.channel.send('Ping?');
    m.edit(
      `Pong! Latency is ${m.createdTimestamp -
        message.createdTimestamp}ms. API Latency is ${Math.round(message.client.ws.ping)}ms`
    );
  }
};

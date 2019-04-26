module.exports = {
  name: 'test',
  description: 'Ping!',
  args: true,
  usage: '<user> <role>',
  guildOnly: true,
  cooldown: 5,
  execute(message, args) {
    message.channel.send(`Pong with args: ${args}`);
  }
};

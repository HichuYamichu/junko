module.exports = {
  name: 'eval',
  description: 'Evaluates provided code',
  args: false,
  usage: '<code>',
  guildOnly: true,
  cooldown: 2,
  aliases: [],
  permissionLVL: 2,
  async execute(message, args) {
    const code = args.join(' ');
    console.log(code);
    const res = eval(code);
    message.channel.send(res);
  }
};

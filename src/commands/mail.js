module.exports = {
  name: 'mail',
  description: 'Shh it\'s a secret',
  args: 3,
  usage: 'Not telling ya!',
  guildOnly: false,
  cooldown: 1,
  aliases: [],
  permissionLVL: 2,
  async execute(message, args) {
    const msg = args.slice(2).join(' ');
    message.client.guilds.get(args[0]).channels.get(args[1]).send(msg);
  }
};

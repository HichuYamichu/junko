module.exports = {
  name: 'eval',
  description: 'Evaluates provided code',
  args: 1,
  usage: '<code>',
  guildOnly: true,
  cooldown: 2,
  aliases: [],
  permissionLVL: 2,
  async execute(message, args) {
    const { UserError } = message.client;
    const code = args.join(' ');
    try {
      eval(code);
    } catch (error) {
      throw new UserError(error);
    }
  }
};

module.exports = {
  name: 'restart',
  description: 'Restarts the bot\'s process.',
  args: 0,
  usage: '',
  examples: ['restart'],
  guildOnly: false,
  cooldown: 60,
  permissionLVL: 2,
  aliases: ['rs'],
  async execute(message, args) {
    process.exit();
  }
};

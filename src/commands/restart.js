module.exports = {
  name: 'restart',
  description: 'restarts the bot\'s process',
  args: 0,
  usage: '<nil>',
  guildOnly: false,
  cooldown: 60,
  permissionLVL: 2,
  aliases: ['rs'],
  async execute(message, args) {
    process.exit();
  }
};

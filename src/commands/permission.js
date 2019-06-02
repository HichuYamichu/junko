module.exports = {
  name: 'permission',
  description: 'sets the user permission level',
  args: true,
  usage: '<mention> <level>',
  guildOnly: true,
  cooldown: 5,
  permissionLVL: 2,
  async execute(message, args) {
    const { UserError } = message.client;
    const user = message.mentions.members.first();
    if (!user) throw new UserError('No mention in the message');
    const lvl = parseInt(args[1], 10);
    if (!Number.isInteger(lvl) || lvl > 2 || lvl < 0) {
      throw new UserError('Invalid permission lvl. Should be integer from 0 to 2.');
    }

    message.client.store.hsetAsync(message.guild.id, user.id, lvl);
    message.channel.send(`Succesfuly changed ${user.displayName}'s permission level`);
  }
};

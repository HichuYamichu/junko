module.exports = {
  name: 'permission',
  description: 'sets the user permission level',
  args: 2,
  usage: '<mention | username | id> [0 | 1 | 2]',
  examples: ['permission 462219867467022347 1'],
  guildOnly: true,
  cooldown: 5,
  aliases: ['perm'],
  permissionLVL: 2,
  async execute(message, args) {
    const { UserError } = message.client;
    const user =
      message.mentions.members.first() ||
      message.client.users.find(u => u.username === args[0]) ||
      message.client.users.get(args[0]);
    if (!user) throw new UserError('No mention, username or id in the message');
    const lvl = parseInt(args[1], 10);
    if (!Number.isInteger(lvl) || lvl > 2 || lvl < 0) {
      throw new UserError('Invalid permission lvl. Should be integer from 0 to 2.');
    }

    message.client.store.hsetAsync(message.guild.id, `perm-${user.id}`, lvl);
    message.channel.send(`Succesfuly changed ${user.displayName}'s permission level`);
  }
};

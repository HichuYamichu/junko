module.exports = {
  name: 'blacklist',
  description: 'Makes me hate you even more.',
  args: 2,
  usage: '[add | remove] <mention | username | id>',
  guildOnly: true,
  cooldown: 1,
  aliases: [],
  permissionLVL: 2,
  async execute(message, args) {
    const { UserError } = message.client;
    const user =
      message.mentions.users.first() ||
      message.client.users.find(u => u.username === args[0]) ||
      message.client.users.get(args[0]);
    const userID = user.id;
    if (!userID) {
      throw new UserError('Unknown user');
    }
    const type = args[0].toLowerCase();
    switch (type) {
    case 'add':
      await message.client.store.hsetAsync(message.guild.id, `blacklist-${userID}`, 1);
      break;
    case 'remove':
      await message.client.store.hdelAsync(message.guild.id, `blacklist-${userID}`);
      break;
    default:
      throw new UserError('Unknown option (add, remove supported)');
    }
    message.channel.send('Done!');
  }
};

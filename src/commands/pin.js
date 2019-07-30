module.exports = {
  name: 'pin',
  description:
    'Enables/disables auto pin feature or adds channel to ignored list (only builin emoji supported)',
  args: 1,
  usage: '[set | disable | ignore] <emoji | IgnoredChannelNames> <threshold>',
  examples: ['pin set ⭐ 5', 'pin disable', 'pin ignore general annoucements shitposting'],
  guildOnly: true,
  cooldown: 1,
  aliases: [],
  permissionLVL: 2,
  async execute(message, args) {
    const { UserError } = message.client;
    const type = args[0].toLowerCase();
    const ignoreList = [];

    switch (type) {
    case 'set':
      if (!args[1] || !args[2]) {
        throw new UserError('You have to specify emoji and required amount of reactions');
      }
      message.client.store.hset(message.guild.id, 'AutoPinEmoji', args[1]);
      message.client.store.hset(message.guild.id, 'AutoPinThreshold', args[2]);
      break;

    case 'disable':
      message.client.store.hdel(message.guild.id, 'AutoPinEmoji');
      message.client.store.hdel(message.guild.id, 'AutoPinThreshold');
      message.client.store.hdel(message.guild.id, 'AutoPinIgnored');
      break;
    case 'ignore':
      args.slice(1).forEach(channelName => {
        const chan = message.guild.channels.find(c => c.name === channelName);
        if (!chan) throw new UserError(`No channel with name: \`${channelName}\``);
        ignoreList.push(chan.id);
      });
      message.client.store.hset(message.guild.id, 'AutoPinIgnored', JSON.stringify(ignoreList));
      break;

    default:
      throw new UserError('Invalid option (set, disable, ignore supported)');
    }
    message.channel.send('Done!');
  }
};

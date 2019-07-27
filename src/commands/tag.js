module.exports = {
  name: 'tag',
  description: 'Creates/updates/retrives/deletes tag.',
  args: 1,
  usage: '[set | get | del | list] <tagName> <tagContent>',
  examples: ['tag set funny haha funny message', 'tag get funny', 'tag del funny'],
  guildOnly: false,
  cooldown: 2,
  aliases: [],
  permissionLVL: 1,
  async execute(message, args) {
    const { UserError } = message.client;
    const tagPrefix = 'tag-';
    let res;
    let tagContent;

    switch (args[0]) {
    case 'set':
      if (!args[1] || !args[2]) {
        throw new UserError('Invalid args');
      }
      tagContent = args.slice(2).join(' ');
      res = await message.client.store.hsetAsync(
        message.guild.id,
        `${tagPrefix}${args[1]}`,
        tagContent
      );
      if (res) message.channel.send('Tag succesfuly created');
      else message.channel.send('Tag updated');
      break;

    case 'get':
      if (!args[1]) {
        throw new UserError('Invalid args');
      }
      res = await message.client.store.hgetAsync(message.guild.id, `${tagPrefix}${args[1]}`);
      if (res) message.channel.send(res);
      else message.channel.send('No such tag');
      break;

    case 'del':
      if (!args[1]) {
        throw new UserError('Invalid args');
      }
      res = await message.client.store.hdelAsync(message.guild.id, `${tagPrefix}${args[1]}`);
      if (res) message.channel.send('Delete succesful');
      else message.channel.send('Failed to delete');
      break;

    case 'list':
      res = await message.client.store.hgetallAsync(message.guild.id);
      res = Object.keys(res).filter(key => key.startsWith('tag-'));
      res.forEach(tag => tag.slice(0, 3));
      message.channel.send(res);
      break;

    default:
      throw new UserError('Invalid args');
    }
  }
};

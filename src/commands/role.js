module.exports = {
  name: 'role',
  description: 'Set up sefl assainable roles',
  args: 1,
  usage: '<emoji name> <role name>...',
  examples: ['role admin'],
  guildOnly: true,
  cooldown: 2,
  aliases: [],
  permissionLVL: 0,
  async execute(message, args) {
    const { UserError } = message.client;
    const emojiIdPattern = new RegExp(/\d{18}/);
    const data = [];
    let text = 'Rect with right emoji to obtain role\n';
    const msg = await message.channel.send(text);

    args.forEach(set => {
      const pair = set.split('|');
      let emoji;
      try {
        [emoji] = pair[0].match(emojiIdPattern);
      } catch (e) {
        [emoji] = pair;
      }
      const role = message.guild.roles.find(r => r.name === pair[1]);
      if (!role) {
        throw new UserError(`No such role as ${pair[1]}`);
      }
      text += `${message.guild.emojis.get(emoji) || emoji}: ${role.name}\n`;
      msg.edit(text);
      try {
        msg.react(emoji);
      } catch (e) {
        throw new UserError('Invalid emoji');
      }
      data.push(`${emoji} ${role.id}`);
    });

    const [_, lastRoleMsg] = await message.client.store.hscanAsync(
      message.guild.id,
      0,
      'MATCH',
      'roleMsg*'
    );
    if (lastRoleMsg.length) {
      message.client.store.hdel(message.guild.id, lastRoleMsg[0]);
    }
    message.client.store.hset(message.guild.id, `roleMsg-${msg.id}`, JSON.stringify(data));
  }
};

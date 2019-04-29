module.exports = {
  name: 'role',
  description: 'Set up user roles',
  args: false,
  usage: '',
  guildOnly: true,
  cooldown: 1,
  async execute(message, roleNames) {
    let text = 'Rect with right emoji to obtain corresponding role\n';
    const msg = await message.channel.send(text);
    roleNames.forEach(roleName => {
      const emoji = message.guild.emojis.find(serverEmoji => serverEmoji.name === roleName);
      text += `${emoji}: ${roleName}\n`;
      msg.edit(text);
      msg.react(emoji);
    });
    message.client.store.set(message.guild.id, msg.id);
  }
};

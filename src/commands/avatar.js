const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'avatar',
  description: 'Sends user avatar.',
  args: 0,
  usage: '<mention | username | id>',
  examples: ['avatar 462219867467022347', 'avatar Junko'],
  guildOnly: false,
  cooldown: 5,
  aliases: ['pfp', 'icon'],
  permissionLVL: 0,
  async execute(message, args) {
    const user =
      message.mentions.users.first() ||
      message.client.users.find(u => u.username === args[0]) ||
      message.client.users.get(args[0]) ||
      message.author;

    const embed = new MessageEmbed().setImage(user.avatarURL({ size: 2048 })).setColor('#fc2041');
    message.channel.send(embed);
  }
};

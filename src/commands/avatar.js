const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'avatar',
  description: 'Sends user avatar',
  args: false,
  usage: '<mention>',
  guildOnly: true,
  cooldown: 10,
  async execute(message, args) {
    const user = message.mentions.users.first() || message.author;
    const embed = new MessageEmbed().setImage(user.avatarURL({ size: 2048 })).setColor('#fc2041');
    message.channel.send(embed);
  }
};

const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class AvatarCommand extends Command {
  constructor() {
    super('avatar', {
      aliases: ['avatar', 'pfp'],
      ownerOnly: false,
      channel: ['guild', 'dm'],
      args: [
        {
          'id': 'user',
          'type': 'user',
          'default': message => message.author
        }
      ],
      clientPermissions: ['EMBED_LINKS']
    });
  }

  async exec(message, { user }) {
    const embed = new MessageEmbed().setImage(user.avatarURL({ size: 2048 })).setColor('#fc2041');
    return message.util.send(embed);
  }
}

module.exports = AvatarCommand;

const { Command } = require('discord-akairo');

class AvatarCommand extends Command {
  constructor() {
    super('avatar', {
      aliases: ['avatar', 'pfp'],
      category: 'general',
      ownerOnly: false,
      channel: ['guild', 'dm'],
      description: {
        content: 'Sends user avatar.',
        usage: '<username | id | mention>',
        examples: ['462219867467022347', '@ someone']
      },
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
    const embed = this.client.util
      .embed()
      .setImage(user.displayAvatarURL({ size: 2048 }))
      .setColor(this.client.config.color);
    return message.util.send(embed);
  }
}

module.exports = AvatarCommand;

import { Message, User } from 'discord.js';
import { Command } from 'discord-akairo';

export default class AvatarCommand extends Command {
  public constructor() {
    super('avatar', {
      aliases: ['avatar', 'pfp'],
      category: 'general',
      ownerOnly: false,
      description: {
        content: 'Sends user avatar.',
        usage: '<username | id | mention>',
        examples: ['462219867467022347', '@ someone']
      },
      args: [
        {
          'id': 'user',
          'type': 'user',
          'default': (message: Message) => message.author
        }
      ],
      clientPermissions: ['EMBED_LINKS']
    });
  }

  public async exec(message: Message, { user }: { user: User }) {
    const embed = this.client.util
      .embed()
      .setImage(user.displayAvatarURL({ size: 2048 }))
      .setColor(this.client.config.color);
    return message.util!.send(embed);
  }
}

module.exports = AvatarCommand;

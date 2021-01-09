import { Message, Role } from 'discord.js';
import { Command } from 'discord-akairo';
import * as moment from 'moment';
import 'moment-duration-format';
import { stripIndents } from 'common-tags';

export default class RoleInfoCommand extends Command {
  public constructor() {
    super('role-info', {
      aliases: ['role-info', 'role'],
      category: 'info',
      ownerOnly: false,
      channel: 'guild',
      description: {
        content: 'Sends info about role.',
        usage: '<id | role name | mention>',
        examples: ['506171893666283520', 'everyone', '@everyone']
      },
      args: [
        {
          'id': 'role',
          'type': 'role',
          'default': (message: Message) => message.guild.roles.cache.get(message.guild.id)
        }
      ],
      clientPermissions: ['EMBED_LINKS']
    });
  }

  public async exec(message: Message, { role }: { role: Role }): Promise<void> {
    const perms = role.permissions.toArray().map(str => {
      if (str === 'VIEW_CHANNEL') return 'Read Messages';
      if (str === 'SEND_TTS_MESSAGES') return 'Send TTS Messages';
      if (str === 'USE_VAD') return 'Use VAD';
      return `${str.replace(/_/g, ' ')
        .toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())}`;
    });

    const embed = this.client.util.embed();
    embed
      .setColor(this.client.config.color)
      .setDescription(`Info about **${role.name}** (ID: ${role.id})`)
      .addField(
        'Info:',
        stripIndents`
				• Color: ${role.hexColor.toUpperCase()}
				• Hoisted: ${role.hoist ? 'Yes' : 'No'}
				• Mentionable: ${role.mentionable ? 'Yes' : 'No'}
				• Creation Date: ${moment.utc(role.createdAt).format('YYYY/MM/DD hh:mm:ss')}
			`
      )
      .addField(
        'Permissions:',
        `
				${perms.map(permission => `• ${permission}`).join('\n') || 'None'}
			`
      )
      .setThumbnail(message.guild.iconURL()!);
    message.util.send(embed);
  }
}

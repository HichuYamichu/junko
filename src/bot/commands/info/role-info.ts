import { Message, Role } from 'discord.js';
import { Command } from 'discord-akairo';
import * as moment from 'moment';
import 'moment-duration-format';
import { permissions } from '../../util/permissions';
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
          id: 'role',
          type: 'role',
          default: (message: Message) => message.guild!.roles.cache.get(message.guild!.id)
        }
      ],
      clientPermissions: ['EMBED_LINKS']
    });
  }

  public async exec(message: Message, { role }: { role: Role }) {
    const perms = Object.keys(permissions).filter(
      // @ts-ignore
      permission => role.permissions.serialize()[permission]
    );
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
				${perms.map(permission => `• ${permissions[permission]}`).join('\n') || 'None'}
			`
      )
      .setThumbnail(message.guild!.iconURL()!);
    return message.util!.send(embed);
  }
}

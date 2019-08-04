const { Command } = require('discord-akairo');
const moment = require('moment');
const permissionsModule = require('../../util/permissions');
const { stripIndents } = require('common-tags');

class RoleInfoCommand extends Command {
  constructor() {
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
          'default': message => message.guild.roles.get(message.guild.id)
        }
      ],
      clientPermissions: ['EMBED_LINKS']
    });
  }

  async exec(message, { role }) {
    const permissions = Object.keys(permissionsModule).filter(
      permission => role.permissions.serialize()[permission]
    );
    const embed = this.client.util.embed();
    embed
      .setColor(this.client.color)
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
				${permissions.map(permission => `• ${permissionsModule[permission]}`).join('\n') || 'None'}
			`
      )
      .setThumbnail(message.guild.iconURL());
    return message.util.send(embed);
  }
}

module.exports = RoleInfoCommand;

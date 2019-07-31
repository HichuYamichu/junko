const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const permissionsModule = require('../../util/permissions');

class RoleInfoCommand extends Command {
  constructor() {
    super('role-info', {
      aliases: ['role-info'],
      ownerOnly: false,
      channel: 'guild',
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
    const embed = new MessageEmbed();
    embed
      .setColor('#fc2041')
      .setDescription(`Info about **${role.name}** (ID: ${role.id})`)
      .addField(
        'Info:',
        `
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
    message.util.send(embed);
  }
}

module.exports = RoleInfoCommand;

const { Command } = require('discord-akairo');
const moment = require('moment');
const { stripIndents } = require('common-tags');

class UserInfoCommand extends Command {
  constructor() {
    super('user-info', {
      aliases: ['user-info', 'user'],
      category: 'info',
      ownerOnly: false,
      channel: 'guild',
      description: {
        content: 'Sends info about user.',
        usage: '<id | username | mention>',
        examples: ['462219867467022347', '@ someone']
      },
      args: [
        {
          'id': 'member',
          'type': 'member',
          'default': message => message.member
        }
      ],
      clientPermissions: ['EMBED_LINKS']
    });
  }

  async exec(message, { member }) {
    const embed = this.client.util.embed();
    embed
      .setColor(this.client.color)
      .setDescription(`Info about **${member.user.tag}** (ID: ${member.id})`)
      .addField(
        'Member Details:',
        stripIndents`
        ${member.nickname === undefined ? '• No nickname' : `• Nickname: ${member.nickname}`}
        • Roles: ${member.roles.map(r => `\`${r.name}\``).join(' ')}
        • Joined at: ${moment.utc(member.joinedAt).format('YYYY/MM/DD hh:mm:ss')}
        `
      )
      .addField(
        'User Details:',
        /* eslint-disable indent */
        stripIndents`
		    • ID: ${member.id}
        • Username: ${member.user.tag}
        • Created at: ${moment.utc(member.user.createdAt).format('YYYY/MM/DD hh:mm:ss')}${
          member.bot ? '\nIs a bot account' : ''
        }
        • Status: ${member.presence.status.toUpperCase()}
        • Activity: ${member.presence.activity ? member.presence.activity.name : 'None'}
        `
        /* eslint-enable indent */
      )
      .setThumbnail(member.user.displayAvatarURL());
    return message.util.send(embed);
  }
}

module.exports = UserInfoCommand;

const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

class UserInfoCommand extends Command {
  constructor() {
    super('user-info', {
      aliases: ['user-info', 'user'],
      ownerOnly: false,
      channel: 'guild',
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
    const embed = new MessageEmbed();
    embed
      .setColor('#fc2041')
      .setDescription(`Info about **${member.user.tag}** (ID: ${member.id})`)
      .addField(
        'Member Details:',
        `
        ${member.nickname === undefined ? '• No nickname' : `• Nickname: ${member.nickname}`}
        • Roles: ${member.roles.map(r => `\`${r.name}\``).join(' ')}
        • Joined at: ${moment.utc(member.joinedAt).format('YYYY/MM/DD hh:mm:ss')}
        `
      )
      .addField(
        'User Details:',
        `
        • ID: ${member.id}
        • Username: ${member.user.tag}
        • Created at: ${moment.utc(member.user.createdAt).format('YYYY/MM/DD hh:mm:ss')}${
  member.bot ? '\nIs a bot account' : ''
}
        • Status: ${member.presence.status.toUpperCase()}
        • Activity: ${member.presence.activity ? member.presence.activity.name : 'None'}
        `
      )
      .setThumbnail(member.user.displayAvatarURL());
    message.util.send(embed);
  }
}

module.exports = UserInfoCommand;

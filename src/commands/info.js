const moment = require('moment');
const { MessageEmbed } = require('discord.js');
const permissionsModule = require('../modules/permissions');

module.exports = {
  name: 'info',
  description: 'Gives you info about user/channel/server/role.',
  args: 1,
  usage: '[user | channel | server | role] *<userID | mention | roleID | roleName>',
  examples: ['info user 462219867467022347', 'image server', 'info role everyone'],
  guildOnly: true,
  cooldown: 4,
  aliases: [],
  permissionLVL: 0,
  async execute(message, args) {
    const { UserError } = message.client;
    const type = args[0].toLowerCase();

    const embed = new MessageEmbed();
    let member;
    let role;

    switch (type) {
    case 'user':
      member = message.guild.members.get(args[0]) || message.mentions.members.first() || message.member;
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
      message.channel.send(embed);
      break;

    case 'channel':
      embed
        .setColor('#fc2041')
        .setDescription(`Info about **${message.channel.name}** (ID: ${message.channel.id})`)
        .addField(
          'Info:',
          `
				• Type: ${message.channel.type}
				• Topic ${message.channel.topic ? message.channel.topic : 'None'}
				• NSFW: ${Boolean(message.channel.nsfw)}
				• Creation Date: ${moment.utc(message.channel.createdAt).format('YYYY/MM/DD hh:mm:ss')}
			`
        )
        .setThumbnail(message.guild.iconURL());
      message.channel.send(embed);
      break;

    case 'server':
      embed
        .setColor('#fc2041')
        .setDescription(`Info about **${message.guild.name}** (ID: ${message.guild.id})`)
        .addField(
          'Channels:',
          `
            • ${message.guild.channels.filter(ch => ch.type === 'text').size} Text, ${
  message.guild.channels.filter(ch => ch.type === 'voice').size
} Voice
            • AFK: ${
  message.guild.afkChannelID
    ? `<#${message.guild.afkChannelID}> after ${message.guild.afkTimeout / 60}min`
    : 'None'
}
          `
        )
        .addField(
          'Member:',
          `
            • ${message.guild.memberCount} members
            • Owner: ${message.guild.owner.user.tag} (ID: ${message.guild.ownerID})
          `
        )
        .addField(
          'Other:',
          `
            • Roles: ${message.guild.roles.size}
            • Region: ${message.guild.region}
            • Created at: ${moment.utc(message.guild.createdAt).format('YYYY/MM/DD hh:mm:ss')}
            • Verification Level: ${message.guild.verificationLevel}
          `
        )
        .setThumbnail(message.guild.iconURL());
      message.channel.send(embed);
      break;

    case 'role':
      role =
          message.guild.roles.get(args[1]) || message.guild.roles.find(r => r.name === args[1]);
      if (!role) {
        throw new UserError('Could not find such role');
      }
      /* eslint-disable no-case-declarations */
      const permissions = Object.keys(permissionsModule).filter(
        permission => role.permissions.serialize()[permission]
      );

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
      message.channel.send(embed);
      break;

    default:
      throw new UserError('Invalid query type (user, channel, server, role supported)');
    }
  }
};

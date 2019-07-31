const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

class ServerInfoCommand extends Command {
  constructor() {
    super('server-info', {
      aliases: ['server-info'],
      ownerOnly: false,
      channel: 'guild',
      clientPermissions: ['EMBED_LINKS']
    });
  }

  async exec(message, args) {
    const embed = new MessageEmbed();
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
    message.util.send(embed);
  }
}

module.exports = ServerInfoCommand;

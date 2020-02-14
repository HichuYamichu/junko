import { Message } from 'discord.js';
import { Command } from 'discord-akairo';
import * as moment from 'moment';
import 'moment-duration-format';
import { stripIndents } from 'common-tags';

export default class ServerInfoCommand extends Command {
  public constructor() {
    super('server-info', {
      aliases: ['server-info', 'server'],
      category: 'info',
      ownerOnly: false,
      channel: 'guild',
      description: {
        content: 'Sends info about this guild.',
        usage: '',
        examples: ['']
      },
      clientPermissions: ['EMBED_LINKS']
    });
  }

  public async exec(message: Message) {
    const embed = this.client.util.embed();
    embed
      .setColor(this.client.config.color)
      .setDescription(`Info about **${message.guild!.name}** (ID: ${message.guild!.id})`)
      .addField(
        'Channels:',
        stripIndents`
        • ${message.guild!.channels.cache.filter(ch => ch.type === 'text').size} Text, ${
  message.guild!.channels.cache.filter(ch => ch.type === 'voice').size
} Voice
        • AFK: ${
  message.guild!.afkChannelID
    ? `<#${message.guild!.afkChannelID}> after ${message.guild!.afkTimeout / 60}min`
    : 'None'
}
        `
      )
      .addField(
        'Members:',
        stripIndents`
        • ${message.guild!.memberCount} members
        • Owner: ${message.guild!.owner!.user.tag} (ID: ${message.guild!.ownerID})
        `
      )
      .addField(
        'Other:',
        stripIndents`
        • Roles: ${message.guild!.roles.cache.size}
        • Region: ${message.guild!.region}
        • Created at: ${moment.utc(message.guild!.createdAt).format('YYYY/MM/DD hh:mm:ss')}
        • Verification Level: ${message.guild!.verificationLevel}
        `
      )
      .setThumbnail(message.guild!.iconURL()!);
    return message.util!.send(embed);
  }
}

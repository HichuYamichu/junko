import { Message, GuildMember } from 'discord.js';
import { Command } from 'discord-akairo';
import * as moment from 'moment';
import { stripIndents } from 'common-tags';

export default class UserInfoCommand extends Command {
  public constructor() {
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
          id: 'member',
          type: 'member',
          default: (message: Message) => message.member
        }
      ],
      clientPermissions: ['EMBED_LINKS']
    });
  }

  public async exec(message: Message, { member }: { member: GuildMember }) {
    const embed = this.client.util.embed();
    embed
      .setColor(this.client.config.color)
      .setDescription(`Info about **${member.user.tag}** (ID: ${member.id})`)
      .addField(
        'Member Details:',
        stripIndents`
        ${member.nickname === undefined ? '• No nickname' : `• Nickname: ${member.nickname}`}
        • Roles: ${member.roles.cache.map(r => `\`${r.name}\``).join(' ')}
        • Joined at: ${moment.utc(member.joinedAt!).format('YYYY/MM/DD hh:mm:ss')}
        `
      )
      .addField(
        'User Details:',
        stripIndents`
		    • ID: ${member.id}
        • Username: ${member.user.tag}
        • Created at: ${moment.utc(member.user.createdAt).format('YYYY/MM/DD hh:mm:ss')}
        • Status: ${member.presence.status.toUpperCase()}
        • Activity: ${member.presence.activities?.[0]?.name ?? 'None'}
        `
      )
      .setThumbnail(member.user.displayAvatarURL());
    return message.util!.send(embed);
  }
}

import { Message, TextChannel, Util } from 'discord.js';
import { Listener } from 'discord-akairo';
import { stripIndents } from 'common-tags';

export default class MessageUpdateListener extends Listener {
  public constructor() {
    super('messageUpdate', {
      emitter: 'client',
      event: 'messageUpdate',
      category: 'client'
    });
  }

  public async exec(oldMessage: Message, newMessage: Message) {
    if (!newMessage.guild) return;
    if (!newMessage.guild.me!.hasPermission('EMBED_LINKS')) return;
    if (oldMessage.author!.bot || newMessage.author!.bot) return;
    if (Util.escapeMarkdown(oldMessage.content) === Util.escapeMarkdown(newMessage.content)) return;
    const messageLog = await this.client.settings.get(newMessage.guild, 'messageLog', '');
    if (!messageLog) return;
    const messageLogChannel = this.client.channels.get(messageLog);
    if (!messageLogChannel) return;

    const embed = this.client.util
      .embed()
      .setAuthor(
        `${newMessage.author!.tag} (${newMessage.author!.id})`,
        newMessage.author!.displayAvatarURL()
      )
      .setTitle('**MESSAGE UPDATED**')
      .setColor(this.client.config.color)
      .setDescription(
        stripIndents`
      **Member:** ${newMessage.member}
      **Channel:** ${newMessage.channel}
      **Old message:** ${oldMessage.content}
      **New message:** ${newMessage.content}
      **Link:** [CLICK](${newMessage.url})
      `
      )
      .setTimestamp(oldMessage.editedAt || newMessage.editedAt || new Date())
      .setFooter('Edited');
    return (messageLogChannel as TextChannel).send(embed);
  }
}

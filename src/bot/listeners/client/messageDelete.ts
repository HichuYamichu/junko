import { Message, TextChannel } from 'discord.js';
import { Listener } from 'discord-akairo';
import { stripIndents } from 'common-tags';

export default class MessageDeleteListener extends Listener {
  public constructor() {
    super('messageDelete', {
      emitter: 'client',
      event: 'messageDelete',
      category: 'client'
    });
  }

  public async exec(message: Message) {
    if (!message.guild!.me!.hasPermission('EMBED_LINKS')) return;
    if (message.author.bot) return;
    if (!message.content) return;
    const messageLog = await this.client.settings.get(message.guild!, 'messageLog', '');
    if (!messageLog) return;
    const messageLogChannel = this.client.channels.cache.get(messageLog);
    if (!messageLogChannel) return;
    const attachment = message.attachments.first();

    const embed = this.client.util
      .embed()
      .setAuthor(
        `${message.author.tag} (${message.author.id})`,
        message.author.displayAvatarURL()
      )
      .setTitle('**MESSAGE DELETED**')
      .setColor(this.client.config.color)
      .setDescription(
        stripIndents`
      **Member:** ${message.member}
      **Channel:** ${message.channel}
      **Content:** ${message.content.substring(0, 1020)}
      `
      )
      .setTimestamp(new Date())
      .setFooter('Deleted');

    if (attachment) embed.addField('**Attachment(s):**', attachment.url);
    return (messageLogChannel as TextChannel).send(embed);
  }
}

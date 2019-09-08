const { Listener } = require('discord-akairo');
const { stripIndents } = require('common-tags');

class MessageDeleteListener extends Listener {
  constructor() {
    super('messageDelete', {
      emitter: 'client',
      event: 'messageDelete',
      category: 'client'
    });
  }

  async exec(message) {
    if (!message.guild.me.hasPermission('EMBED_LINKS')) return;
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content) return;
    const modLogID = await this.client.store.get(message.guild.id, 'logChannel', null);
    if (!modLogID) return;
    const modChannel = this.client.channels.get(modLogID);
    if (!modChannel) return;
    const attachment = message.attachments.first();

    const embed = this.client.util
      .embed()
      .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
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

    if (attachment) embed.addField('**Attachment(s):**', attachment ? attachment.url : 'None');
    return modChannel.send(embed);
  }
}

module.exports = MessageDeleteListener;

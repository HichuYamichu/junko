const { Listener } = require('discord-akairo');

class MessageDeleteListener extends Listener {
  constructor() {
    super('messageDelete', {
      emitter: 'client',
      event: 'messageDelete',
      category: 'client'
    });
  }

  async exec(message) {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content) return;
    const modLogID = await this.client.store.getModChannel(message.guild, null);
    if (!modLogID) return;
    const modChannel = this.client.channels.get(modLogID);
    if (!modChannel) return;
    const attachment = message.attachments.first();

    const embed = this.client.util
      .embed()
      .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
      .setTitle('**DELETED MESSAGE**')
      .setColor(this.client.config.color)
      .addField('**Member:**', message.member, true)
      .addField('**Channel:**', message.channel, true)
      .addField('**Content:**', `${message.content.substring(0, 1020)}`, true)
      .setTimestamp(new Date())
      .setFooter('Deleted');

    if (attachment) embed.addField('**Attachment(s):**', attachment ? attachment.url : 'None');
    return modChannel.send(embed);
  }
}

module.exports = MessageDeleteListener;

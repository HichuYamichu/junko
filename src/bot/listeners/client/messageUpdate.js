const { Listener } = require('discord-akairo');
const { Util } = require('discord.js');

class MessageUpdateListener extends Listener {
  constructor() {
    super('messageUpdate', {
      emitter: 'client',
      event: 'messageUpdate',
      category: 'client'
    });
  }

  async exec(oldMessage, newMessage) {
    if (oldMessage.author.bot || newMessage.author.bot) return;
    if (!newMessage.guild) return;
    if (Util.escapeMarkdown(oldMessage.content) === Util.escapeMarkdown(newMessage.content)) return;
    const modLogID = await this.client.store.getModChannel(newMessage.guild, null);
    if (!modLogID) return;
    const modChannel = this.client.channels.get(modLogID);
    if (!modChannel) return;

    const embed = this.client.util
      .embed()
      .setAuthor(`${newMessage.author.tag} (${newMessage.author.id})`, newMessage.author.displayAvatarURL())
      .setTitle('**UPDATED MESSAGE**')
      .setColor(this.client.config.color)
      .addField('**Member:**', newMessage.member, true)
      .addField('**Channel:**', newMessage.channel, true)
      .addField('**Link:**', `[CLICK](${newMessage.url})`, true)
      .addField('**Old message:**', oldMessage.content, true)
      .addField('**New message:**', newMessage.content, true)
      .setTimestamp(oldMessage.editedAt || newMessage.editedAt || new Date())
      .setFooter('Edited');
    return modChannel.send(embed);
  }
}

module.exports = MessageUpdateListener;

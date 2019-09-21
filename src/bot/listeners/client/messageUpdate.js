const { Listener } = require('discord-akairo');
const { Util } = require('discord.js');
const { stripIndents } = require('common-tags');

class MessageUpdateListener extends Listener {
  constructor() {
    super('messageUpdate', {
      emitter: 'client',
      event: 'messageUpdate',
      category: 'client'
    });
  }

  async exec(oldMessage, newMessage) {
    if (!newMessage.guild) return;
    if (!newMessage.guild.me.hasPermission('EMBED_LINKS')) return;
    if (oldMessage.author.bot || newMessage.author.bot) return;
    if (Util.escapeMarkdown(oldMessage.content) === Util.escapeMarkdown(newMessage.content)) return;
    const messageLog = await this.client.store.get(newMessage.guild, 'messageLog', null);
    if (!messageLog) return;
    const messageLogChannel = this.client.channels.get(messageLog);
    if (!messageLogChannel) return;

    const embed = this.client.util
      .embed()
      .setAuthor(
        `${newMessage.author.tag} (${newMessage.author.id})`,
        newMessage.author.displayAvatarURL()
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
    return messageLogChannel.send(embed);
  }
}

module.exports = MessageUpdateListener;

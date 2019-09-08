const { Command } = require('discord-akairo');

class TagListCommand extends Command {
  constructor() {
    super('tag-list', {
      category: 'tags',
      ownerOnly: false,
      channel: 'guild'
    });
  }

  async exec(message) {
    const tags = await this.client.store.Tag.findAll({ guildID: message.guild.id });
    if (!tags.length) return message.util.send('No tags available for this guild');

    const guildTags = tags
      .map(tag => `\`${tag.name}\``)
      .sort()
      .join(', ');
    const embed = this.client.util
      .embed()
      .setColor(this.client.config.color)
      .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
      .addField('**Available tags:**', guildTags);
    return message.util.send(embed);
  }
}

module.exports = TagListCommand;

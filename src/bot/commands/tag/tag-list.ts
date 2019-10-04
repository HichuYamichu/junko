import { Message } from 'discord.js';
import { Command } from 'discord-akairo';

export default class TagListCommand extends Command {
  constructor() {
    super('tag-list', {
      category: 'tags',
      ownerOnly: false,
      channel: 'guild'
    });
  }

  async exec(message: Message) {
    const tags = await this.client.settings.Tag.findAll({ guildID: message.guild!.id });
    if (!tags.length) return message.util!.send('No tags available for this guild!');

    const guildTags = tags
    // @ts-ignore
      .map(tag => `\`${tag.name}\``)
      .sort()
      .join(', ');
    const embed = this.client.util
      .embed()
      .setColor(this.client.config.color)
      .setAuthor(`${message.author!.tag} (${message.author!.id})`, message.author!.displayAvatarURL())
      .addField('**Available tags:**', guildTags);
    return message.util!.send(embed);
  }
}

module.exports = TagListCommand;

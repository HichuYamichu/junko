import { Message } from 'discord.js';
import { Command } from 'discord-akairo';
import { Tag } from '../../models/Tag';

export default class TagListCommand extends Command {
  public constructor() {
    super('tag-list', {
      category: 'tags',
      ownerOnly: false,
      channel: 'guild'
    });
  }

  public async exec(message: Message) {
    const repo = this.client.db.getRepository(Tag);
    const tags = await repo.find({ where: { guild: message.guild!.id } });

    if (!tags.length) return message.util!.send('No tags available for this guild!');

    const guildTags = tags
      .map(tag => `\`${tag.name}\``)
      .sort()
      .join(', ');

    const embed = this.client.util
      .embed()
      .setColor(this.client.config.color)
      .setAuthor(
        `${message.author.tag} (${message.author.id})`,
        message.author.displayAvatarURL()
      )
      .addField('**Available tags:**', guildTags);

    return message.util!.send(embed);
  }
}

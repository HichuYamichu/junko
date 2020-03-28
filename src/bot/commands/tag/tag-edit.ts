import { Message } from 'discord.js';
import { Command } from 'discord-akairo';
import { Tag } from '../../models/Tag';

export default class TagEditCommand extends Command {
  public constructor() {
    super('tag-edit', {
      category: 'tags',
      ownerOnly: false,
      channel: 'guild',
      description: {
        content: 'edits a tag',
        usage: '<tag> <content>',
        examples: ['tagName TagContent']
      },
      args: [
        {
          id: 'name',
          type: 'lowercase',
          prompt: {
            start: 'Enter the tag name.',
            retry: 'You have to enter tag name you want to edit.'
          }
        },
        {
          id: 'content',
          match: 'rest',
          prompt: {
            start: 'Enter tag content.',
            retry: 'Tag must have some content.'
          }
        }
      ]
    });
  }

  public async exec(message: Message, { name, content }: { name: string; content: string }) {
    if (name && name.length >= 255) {
      return message.util!.reply('tag name must be less then 255 characters.');
    }
    if (content && content.length >= 1900) {
      return message.util!.reply('tag content must be less then 1900 characters (discord limits).');
    }

    const guild = message.guild!.id;
    const author = message.author.id;

    const where = this.client.isOwner(message.author) ? { guild, name } : { guild, name, author };

    const repo = this.client.db.getRepository(Tag);
    const result = await repo.update(where, { content });

    if (result.affected === 0) {
      return message.util!.send(
        `Couldn't edit that tag! Either you don't own it or this tag does not exist.`
      );
    }
    return message.util!.send('Tag succesfuly updated.');
  }
}

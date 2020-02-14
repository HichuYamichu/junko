import { Message } from 'discord.js';
import { Command } from 'discord-akairo';
import { Tag } from '../../models/Tag';

export default class TagAddCommand extends Command {
  public constructor() {
    super('tag-add', {
      category: 'tags',
      ownerOnly: false,
      channel: 'guild',
      args: [
        {
          id: 'name',
          type: 'lowercase',
          prompt: {
            start: 'Enter the tag name.',
            retry: 'You have to enter tag name so you\'re able to find that it later.'
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

    const repo = this.client.db.getRepository(Tag);
    const { count } = await repo
      .createQueryBuilder()
      .select('COUNT(Tag.author)', 'count')
      .where({ guild, author })
      .getRawOne();

    if (count >= 15 && !this.client.isOwner(message.author)) {
      return message.util!.reply(
        'you have reached max tag count for this guild. You must edit or delete your existing tags.'
      );
    }

    try {
      const tag = new Tag();
      tag.guild = guild;
      tag.author = author;
      tag.name = name;
      tag.content = content;
      await repo.save(tag);
    } catch (e) {
      if (e.message === `duplicate key value violates unique constraint "guild_name"`) {
        const reply = `Tag with such name already exists in this guild.`;
        return message.util!.send(reply);
      }

      this.client.logger.error(e);
      return message.util!.send('Unexpected problem occurred!');
    }
    return message.util!.send('Tag succesfuly created.');
  }
}

import { Message } from 'discord.js';
import { Command } from 'discord-akairo';

export default class TagEditCommand extends Command {
  constructor() {
    super('tag-edit', {
      category: 'tags',
      ownerOnly: false,
      channel: 'guild',
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

  async exec(message: Message, { name, content }: { name: string; content: string }) {
    if (name && name.length >= 255) {
      return message.util!.reply('tag name must be less then 255 characters.');
    }
    if (content && content.length >= 1900) {
      return message.util!.reply('tag content must be less then 1900 characters (discord limits).');
    }

    const guildID = message.guild!.id;
    const author = message.author!.id;

    const where = this.client.isOwner(message.author!)
      ? { guildID, name }
      : { guildID, name, author };

    const [updated] = await this.client.settings.Tag.update({ content }, { where });
    if (!updated) {
      return message.util!.send(
        `Couldn't edit that tag! Either you don't own it or this tag does not exist.`
      );
    }
    return message.util!.send('Tag succesfuly updated.');
  }
}

module.exports = TagEditCommand;

import { Message } from 'discord.js';
import { Command } from 'discord-akairo';

export default class TagDelCommand extends Command {
  constructor() {
    super('tag-del', {
      category: 'tags',
      ownerOnly: false,
      channel: 'guild',
      args: [
        {
          id: 'name',
          type: 'lowercase',
          prompt: {
            start: 'Enter the tag name.',
            retry: 'You have to enter valid tag name.'
          }
        }
      ]
    });
  }

  async exec(message: Message, { name }: { name: string }) {
    const guildID = message.guild!.id;
    const author = message.author!.id;
    const deleted = await this.client.settings.Tag.destroy({
      where: {
        guildID,
        name,
        author
      }
    });
    if (!deleted) {
      return message.util!.send(
        `Couldn't delete that tag! Either you don't own it or this tag does not exist.`
      );
    }
    return message.util!.send(`Succesfuly deleted \`${name}\`.`);
  }
}

module.exports = TagDelCommand;

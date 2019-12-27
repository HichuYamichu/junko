import { Message } from 'discord.js';
import { Command } from 'discord-akairo';
import { Tag } from '../../models/Tag';

export default class TagDelCommand extends Command {
  public constructor() {
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

  public async exec(message: Message, { name }: { name: string }) {
    const guild = message.guild!.id;
    const author = message.author!.id;

    const repo = this.client.db.getRepository(Tag);
    const where = this.client.isOwner(message.author!) ? { guild, name } : { guild, name, author };

    const result = await repo
      .createQueryBuilder()
      .delete()
      .where(where)
      .execute();

    if (result.affected === 0) {
      return message.util!.send(
        `Couldn't delete that tag! Either you don't own it or this tag does not exist.`
      );
    }

    return message.util!.send(`Succesfuly deleted \`${name}\`.`);
  }
}

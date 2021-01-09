import { Message, User } from 'discord.js';
import { Command } from 'discord-akairo';
import { Privileged } from '../../../models/Privileged';

export default class PrivilegeRemoveCommand extends Command {
  public constructor() {
    super('privilege-remove', {
      category: 'privilege',
      ownerOnly: true,
      description: {
        content: 'Removes privielege',
        usage: '<id | username | mention>',
        examples: ['462219867467022347', '@ someone']
      },
      args: [
        {
          id: 'user',
          type: 'user',
          prompt: {
            start: 'Whom?',
            retry: 'Seems like an invalid user.'
          }
        }
      ]
    });
  }

  public async exec(message: Message, { user }: { user: User }): Promise<void> {
    const repo = this.client.db.getRepository(Privileged);
    await repo.delete({ userId: user.id });
    message.util.send(`**${user.tag}** lost his privilege.`);
  }
}

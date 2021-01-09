import { Message, User } from 'discord.js';
import { Command } from 'discord-akairo';
import { Privileged } from '../../../models/Privileged';

export default class PrivilegeGiveCommand extends Command {
  public constructor() {
    super('privilege-give', {
      category: 'privilege',
      ownerOnly: true,
      description: {
        content: 'Gives privielege',
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
    const privUser = new Privileged();
    privUser.userId = user.id;
    await repo.save(privUser);

    message.util.send(`**${user.tag}** was given his privilege.`);
  }
}

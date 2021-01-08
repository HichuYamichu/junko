import { Message, User } from 'discord.js';
import { Command } from 'discord-akairo';

export default class BlacklistCommand extends Command {
  public constructor() {
    super('blacklist', {
      aliases: ['blacklist'],
      category: 'owner',
      ownerOnly: true,
      description: {
        content: 'Makes me hate you even more.',
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
    const res = await this.client.settings.get(message.guild, 'blacklist', []);
    const blacklist = typeof res === 'string' ? JSON.parse(res) : res;
    if (blacklist.includes(user.id)) {
      const index = blacklist.indexOf(user.id);
      blacklist.splice(index, 1);
      await this.client.settings.set(message.guild.id, 'blacklist', blacklist);
      message.util.send(`**${user.tag}** has been removed from the blacklist.`);
      return;
    }
    blacklist.push(user.id);
    await this.client.settings.set(message.guild.id, 'blacklist', blacklist);
    message.util.send(`**${user.tag}** has been added to the blacklist.`);
  }
}

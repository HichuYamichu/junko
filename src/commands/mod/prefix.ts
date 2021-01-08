import { Message } from 'discord.js';
import { Command, Argument } from 'discord-akairo';

export default class PrefixCommand extends Command {
  public constructor() {
    super('prefix', {
      aliases: ['prefix'],
      category: 'mod',
      ownerOnly: false,
      channel: 'guild',
      description: {
        content: 'Sets prefix for this server.',
        usage: '<prefix>',
        examples: ['!', '?', 'longprefix', ',.!']
      },
      args: [
        {
          id: 'prefix',
          match: 'content',
          type: Argument.validate('string', (m, p) => !/\s/.test(p) && p.length <= 10),
          prompt: {
            start: 'Provide a prefix you would like to use.',
            retry: 'Prefix must not contain spaces and be less then 10 characters.'
          }
        }
      ],
      userPermissions: ['MANAGE_GUILD']
    });
  }

  public async exec(message: Message, { prefix }: { prefix: string }): Promise<void> {
    await this.client.settings.set(message.guild.id, 'prefix', prefix);
    message.util.send(`My prefix is now \`${prefix}\``);
  }
}

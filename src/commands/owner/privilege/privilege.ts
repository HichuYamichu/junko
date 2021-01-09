import { Command, Flag } from 'discord-akairo';

export default class PrivilegeCommand extends Command {
  public constructor() {
    super('privilege', {
      category: 'privilege',
      aliases: ['privilege', 'priv'],
      channel: 'guild',
      description: {
        content: 'gives or removes privilege',
        usage: '<method> <...args>',
        examples: ['priv g @ someone']
      }
    });
  }

  public *args(): unknown {
    const method = yield {
      type: [
        ['privilege-give', 'give', 'g'],
        ['privilege-remove', 'remove', 'r'],
      ],
      otherwise: () => 'You must specify a method see `help privilege` for more info'
    };

    return Flag.continue(method);
  }
}

import { Command, Flag } from 'discord-akairo';
import { stripIndents } from 'common-tags';

export default class MyriagCommand extends Command {
  public constructor() {
    super('myriag', {
      aliases: ['myriag'],
      category: 'myriag',
      description: {
        content: stripIndents`Use one of the following:
        • eval \`<lang> <code>\`
        • containers
        • languages
        • cleanup
        • create `,
        usage: '<method> <...args>',
        examples: []
      }
    });
  }

  public *args(): unknown {
    const method = yield {
      type: [
        ['myriag-eval', 'eval', 'e'],
        ['myriag-create', 'create'],
        ['myriag-languages', 'languages', 'l'],
        ['myriag-containers', 'containers', 'cont'],
        ['myriag-cleanup', 'cleanup', 'c']
      ],
      otherwise: () => 'You must specify a method see `help myriag` for more info'
    };

    return Flag.continue(method);
  }
}

import { Command, Flag } from 'discord-akairo';
import { stripIndents } from 'common-tags';

export default class LogCommand extends Command {
  public constructor() {
    super('log', {
      category: 'mod',
      aliases: ['log'],
      channel: 'guild',
      description: {
        content: stripIndents`Use one of the following:
        • member \`<channel mention | channel id | channel name>\`
        • message \`<channel mention | channel id | channel name>\``,
        usage: '<method> <...args>',
        examples: ['member #member-logs']
      }
    });
  }

  public *args() {
    const method = yield {
      type: [['log-member', 'member', 'mem'], ['log-message', 'message', 'msg']],
      otherwise: () =>
        // eslint-disable-next-line max-len
        'You must specify a method like `log-member` or `log-message`. See `help log` for more info.'
    };

    return Flag.continue(method);
  }
}

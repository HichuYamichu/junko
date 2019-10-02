const { Command, Flag } = require('discord-akairo');
const { stripIndents } = require('common-tags');

class LogCommand extends Command {
  constructor() {
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

  *args() {
    const method = yield {
      type: [
        ['log-member', 'member', 'mem'],
        ['log-message', 'message', 'msg']
      ],
      otherwise: () => 'You must specify a method like \`log-member\` or \`log-message\`. See `help log` for more info.'
    };

    return Flag.continue(method);
  }
}

module.exports = LogCommand;
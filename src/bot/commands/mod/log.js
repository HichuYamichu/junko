const { Command, Flag } = require('discord-akairo');
const { stripIndents } = require('common-tags');

class LogCommand extends Command {
  constructor() {
    super('log', {
      category: 'log',
      aliases: ['log'],
      channel: 'guild',
      description: {
        content: stripIndents`Use one of the following:
        • set \`<channel mention | channel id | channel name>\`
        • del `,
        usage: '<method> <...args>',
        examples: ['set #general']
      }
    });
  }

  *args() {
    const method = yield {
      type: [
        ['log-set', 'set', 'enable'],
        ['log-del', 'del', 'rm', 'disable']
      ],
      otherwise: () => 'You must specify a method like \`set\` or \`del\`. See `help log` for more info.'
    };

    return Flag.continue(method);
  }
}

module.exports = LogCommand;

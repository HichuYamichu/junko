const { Command } = require('discord-akairo');

class EvalCommand extends Command {
  constructor() {
    super('eval', {
      aliases: ['eval'],
      category: 'owner',
      ownerOnly: true,
      channel: ['guild', 'dm'],
      description: {
        content: 'Evaluates provided code.',
        usage: '<code>',
        examples: ['message.util.reply(\'no eval 4 u\')']
      },
      args: [
        {
          id: 'code',
          type: 'content',
          prompt: {
            start: message => `${message.author}, C'mon gib code.`,
            retry: message => `${message.author}, C'mon gib code.`
          }
        }
      ]
    });
  }

  async exec(message, { code }) {
    try {
      let evaled = await eval(code);
      if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
      return message.util.send(evaled, { code: 'xl', split: true });
    } catch (err) {
      return message.util.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
    }
  }
}

module.exports = EvalCommand;

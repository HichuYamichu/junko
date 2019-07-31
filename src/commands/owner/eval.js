const { Command } = require('discord-akairo');

class EvalCommand extends Command {
  constructor() {
    super('eval', {
      aliases: ['eval'],
      ownerOnly: true,
      channel: ['guild', 'dm'],
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
      message.util.send(evaled, { code: 'xl', split: true });
    } catch (err) {
      message.util.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
    }
  }
}

module.exports = EvalCommand;

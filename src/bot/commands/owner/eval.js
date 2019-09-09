const { Command } = require('discord-akairo');
const util = require('util');

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
        examples: ["message.util.reply('no eval 4 u')"]
      },
      args: [
        {
          id: 'code',
          type: 'content',
          prompt: {
            start: 'Code please.',
            retry: 'Code please.'
          }
        }
      ]
    });
  }

  async exec(message, { code }) {
    const token = this.client.token.split('').join('[^]{0,2}');
    const rev = this.client.token
      .split('')
      .reverse()
      .join('[^]{0,2}');
    const tokenRegex = new RegExp(`${token}|${rev}`, 'g');

    try {
      // eslint-disable-next-line no-eval
      let evaled = await eval(code);
      if (evaled !== null && typeof evaled.then === 'function') evaled = await evaled;

      if (typeof output !== 'string') evaled = util.inspect(evaled, { depth: 0 });
      evaled = evaled.replace(tokenRegex, '[super secret token]');
      if (evaled.length + code.length > 1900) evaled = 'Output too long.';

      await message.util.send([
        `**Input**\`\`\`js`,
        code,
        '```',
        `**Output**\`\`\`js`,
        evaled,
        '```'
      ]);
    } catch (err) {
      return message.util.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
    }
  }
}

module.exports = EvalCommand;

import { Message } from 'discord.js';
import { Command } from 'discord-akairo';
import { inspect } from 'util';

export default class EvalCommand extends Command {
  public constructor() {
    super('eval', {
      aliases: ['eval'],
      category: 'owner',
      ownerOnly: true,
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

  public async exec(message: Message, { code }: { code: string }) {
    const token = this.client.token.split('').join('[^]{0,2}');
    const rev = this.client.token
      .split('')
      .reverse()
      .join('[^]{0,2}');
    const tokenRegex = new RegExp(`${token}|${rev}`, 'g');

    try {
      // eslint-disable-next-line no-eval
      let evaled = await eval(code);
      if ((evaled !== null || undefined) && typeof evaled.then === 'function') {
        evaled = await evaled;
      }

      if (typeof evaled !== 'string') evaled = inspect(evaled, { depth: 0 });
      evaled = evaled.replace(tokenRegex, '[super secret token]');
      if ((evaled as string).length + code.length > 1900) evaled = 'Output too long.';

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

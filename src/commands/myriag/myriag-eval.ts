import { Message } from 'discord.js';
import { Command } from 'discord-akairo';
import fetch from 'node-fetch';

export default class MyriagEvalCommand extends Command {
  public constructor() {
    super('myriag-eval', {
      category: 'myriag',
      ownerOnly: false,
      description: {
        content: 'Evaluates arbitrary code',
        usage: '<code block>',
        examples: ['```py print("hello") ```']
      },
      args: [
        {
          id: 'input',
          match: 'content'
        }
      ]
    });
  }

  public async exec(message: Message, { input }: { input: string }): Promise<void> {
    const regex = /^\s*(`{1,3})(.+?)[ \n]([^]+)\1\s*$/;
    const match = regex.exec(input);
    if (!match) {
      message.util.send('Invalid input!');
      return;
    }
    const language = this.client.myriag.getLanguageByAlias(match[2]);
    if (!language) {
      message.util.send('Language not supported');
      return;
    }
    const code = match[3].trim();
    const result = await this.client.myriag.eval(language, code);
    const output = `\`\`\`\n${result}\n\`\`\``;
    if (output.length > 1900) {
      const response = await fetch('https://hastebin.com/documents', {
        method: 'POST',
        body: output,
      });

      if (!response.ok) {
        message.util.send(`Output was too long and I wasn't able to upload it to hastebin`);
        return;
      }

      const body = await response.json();
      message.util.send(`Output was too long: <https://hastebin.com/${body.key}>`);
      return;
    }
    message.util.send(output);
  }
}

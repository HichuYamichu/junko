import { Message } from 'discord.js';
import { Command } from 'discord-akairo';
import axios from 'axios';

export default class MyriagEvalCommand extends Command {
  public constructor() {
    super('myriag-eval', {
      category: 'myriag',
      ownerOnly: true,
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

  public async exec(message: Message, { input }: { input: string }) {
    const regex = /^\s*(`{1,3})(.+?)[ \n]([^]+)\1\s*$/;
    const match = regex.exec(input);
    if (!match) {
      return message.util.send('Invalid input!');
    }
    const language = this.client.myriag.getLanguageByAlias(match[2]);
    if (!language) {
      return message.util.send('Language not supported');
    }
    const code = match[3].trim();
    const result = await this.client.myriag.eval(language, code);
    const output = `\`\`\`\n${result}\n\`\`\``;
    if (output.length >= 2000) {
      const { data } = await axios.post('https://hasteb.in/documents', result);
      return message.util.send(`Output was too long: <https://hasteb.in/${data.key}>`);
    }
    return message.util.send(output);
  }
}

import { Message } from 'discord.js';
import { Command } from 'discord-akairo';

export default class MyriagCreateCommand extends Command {
  public constructor() {
    super('myriag-create', {
      category: 'myriag',
      ownerOnly: true,
      description: {
        content: 'Creates Myriag container',
        usage: '<lang>',
        examples: ['ts', 'typescript', 'rust']
      },
      args: [
        {
          id: 'lang',
          match: 'content'
        }
      ]
    });
  }

  public async exec(message: Message, { lang }: { lang: string }) {
    const language = this.client.apiManager.myraig.getLanguageByAlias(lang);
    if (!language) {
      return message.util!.send('Language not supported');
    }
    const success = await this.client.apiManager.myraig.createContainer(language);
    if (!success) {
      return message.util!.send('Failed to create container');
    }
    return message.util!.send(`Created: \`myriag_${language}\``);
  }
}

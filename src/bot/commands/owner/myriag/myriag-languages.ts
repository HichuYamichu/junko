import { Message } from 'discord.js';
import { Command } from 'discord-akairo';

export default class MyriagLanguagesCommand extends Command {
  public constructor() {
    super('myriag-languages', {
      category: 'myriag',
      ownerOnly: true,
      description: {
        content: 'lists avalible languages',
        usage: '',
        examples: []
      }
    });
  }

  public async exec(message: Message) {
    const languages = await this.client.apiManager.myraig.getLanguages();
    return message.util.send(`Avalible languages:\`${languages.join('` `')}\``);
  }
}

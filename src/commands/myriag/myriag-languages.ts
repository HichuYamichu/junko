import { Message } from 'discord.js';
import { Command } from 'discord-akairo';

export default class MyriagLanguagesCommand extends Command {
  public constructor() {
    super('myriag-languages', {
      category: 'myriag',
      ownerOnly: false,
      description: {
        content: 'lists avalible languages',
        usage: '',
        examples: []
      }
    });
  }

  public async exec(message: Message): Promise<void> {
    const languages = await this.client.myriag.getLanguages();
    message.util.send(`Avalible languages:\`${languages.join('` `')}\``);
  }
}

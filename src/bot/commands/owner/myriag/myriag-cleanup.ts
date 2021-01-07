import { Message } from 'discord.js';
import { Command } from 'discord-akairo';

export default class MyriagCleanupCommand extends Command {
  public constructor() {
    super('myriag-cleanup', {
      category: 'myriag',
      ownerOnly: true,
      description: {
        content: 'cleans up Myriag containers',
        usage: '',
        examples: []
      }
    });
  }

  public async exec(message: Message) {
    const containers = await this.client.myriag.cleanup();
    return message.util.send(`Removed containers:\`${containers.join('` `')}\``);
  }
}

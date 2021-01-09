import { Message } from 'discord.js';
import { Command } from 'discord-akairo';

export default class MyriagContainersCommand extends Command {
  public constructor() {
    super('myriag-containers', {
      category: 'myriag',
      ownerOnly: false,
      description: {
        content: 'lists avalible containers',
        usage: '',
        examples: []
      }
    });
  }

  public async exec(message: Message): Promise<void> {
    const containers = await this.client.myriag.getContainers();
    message.util.send(`Avalible containers:\`${containers.join('` `')}\``);
  }
}

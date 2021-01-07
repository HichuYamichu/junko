import { Message } from 'discord.js';
import { Command } from 'discord-akairo';

export default class MyriagContainersCommand extends Command {
  public constructor() {
    super('myriag-containers', {
      category: 'myriag',
      ownerOnly: true,
      description: {
        content: 'lists avalible containers',
        usage: '',
        examples: []
      }
    });
  }

  public async exec(message: Message) {
    const containers = await this.client.myriag.getContainers();
    return message.util.send(`Avalible containers:\`${containers.join('` `')}\``);
  }
}

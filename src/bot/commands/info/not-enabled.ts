import { Message } from 'discord.js';
import { Command } from 'discord-akairo';

export default class NotEnabled extends Command {
  public constructor() {
    super('not-enabled', {
      category: 'info'
    });
  }

  public async exec(message: Message) {
    return message.util!.send('Requested functionality not enabled!');
  }
}
module.exports = NotEnabled;

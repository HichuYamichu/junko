import { Message } from 'discord.js';
import { Command } from 'discord-akairo';

export default class OwoCommand extends Command {
  constructor() {
    super('owo', {
      category: 'passive',
      regex: /^(owo|uwu)$/i,
    });
  }

  async exec(message: Message) {
    const reply = await this.client.getReply(message, 'owo');
    return message.util!.send(reply);
  }
}

module.exports = OwoCommand;

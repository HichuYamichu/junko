import { Message } from 'discord.js';
import { Command } from 'discord-akairo';

export default class OwoCommand extends Command {
  public constructor() {
    super('owo', {
      category: 'passive',
      regex: /^(owo|uwu)$/i
    });
  }

  public async exec(message: Message) {
    const reply = await this.client.replyManager.getReply(message, 'owo');
    return message.util!.send(reply);
  }
}

import { Message } from 'discord.js';
import { Inhibitor } from 'discord-akairo';

export default class BlacklistInhibitor extends Inhibitor {
  public constructor() {
    super('blacklist', {
      reason: 'blacklist'
    });
  }

  public async exec(message: Message) {
    const blacklist = await this.client.settings.get(message.guild!, 'blacklist', ['']);
    return blacklist.includes(message.author.id);
  }
}

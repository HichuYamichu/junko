import { Message } from 'discord.js';
import { Inhibitor } from 'discord-akairo';

export default class BlacklistInhibitor extends Inhibitor {
  public constructor() {
    super('blacklist', {
      reason: 'blacklist'
    });
  }

  public async exec(message: Message) {
    const res = await this.client.settings.get(message.guild!, 'blacklist', []);
    const blacklist = typeof res === 'string' ? JSON.parse(res) : res;
    return blacklist.includes(message.author!.id);
  }
}

module.exports = BlacklistInhibitor;

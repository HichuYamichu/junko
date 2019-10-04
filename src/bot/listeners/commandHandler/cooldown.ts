import { Message, TextChannel } from 'discord.js';
import { Listener, Command } from 'discord-akairo';

export default class CooldownListener extends Listener {
  constructor() {
    super('cooldown', {
      event: 'cooldown',
      emitter: 'commandHandler'
    });
  }

  async exec(message: Message, command: Command, remaining: number) {
    const time = remaining / 1000;

    if (
      message.guild
        ? (message.channel as TextChannel).permissionsFor(this.client.user!)!.has('SEND_MESSAGES')
        : true
    ) {
      const reply = await this.client.getReply(message, 'cooldown');
      return message.util!.send(`${reply} Cooldown left: \`${time.toFixed(1)}\`s.`);
    }
  }
}

module.exports = CooldownListener;

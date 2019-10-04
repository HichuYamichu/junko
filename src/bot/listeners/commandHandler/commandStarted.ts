import { Message } from 'discord.js';
import { Listener, Command } from 'discord-akairo';
import { inspect } from 'util';

export default class CommandBlockedListener extends Listener {
  constructor() {
    super('commandStarted', {
      event: 'commandStarted',
      emitter: 'commandHandler'
    });
  }

  clean(item: any) {
    if (typeof item === 'string') return item;
    const cleaned = inspect(item, { depth: 1 });
    return cleaned;
  }

  exec(message: Message, command: Command, args: any) {
    const channel = message.guild
      ? `Guild: ${message.guild.name} (${message.guild.id})`
      : `DM: ${message.author!.tag} (${message.author!.id})`;
    const cmdArgs = Object.keys(args).length && !args.command ? `Args: ${this.clean(args)}` : '';
    const log = `Started ${command.id} on ${channel} ${cmdArgs}`;
    this.client.logger.info(log);
    this.client.prometheus.metrics.commandCounter.inc();
  }
}

module.exports = CommandBlockedListener;

import { Message } from 'discord.js';
import { Listener, Command } from 'discord-akairo';
import { inspect } from 'util';
import { Logger } from '../../structs/Logger';

export default class CommandCancelledListener extends Listener {
  public constructor() {
    super('commandFinished', {
      emitter: 'commandHandler',
      event: 'commandFinished'
    });
  }

  public clean(item: any) {
    if (typeof item === 'string') return item;
    const cleaned = inspect(item, { depth: 1 });
    return cleaned;
  }

  public exec(message: Message, command: Command, args: any) {
    const channel = message.guild
      ? `Guild: ${message.guild.name} (${message.guild.id})`
      : `DM: ${message.author.tag} (${message.author.id})`;
    const cmdArgs = Object.keys(args).length && !args.command ? `Args: ${this.clean(args)}` : '';
    const log = `Finished  ${command.id} on ${channel} ${cmdArgs}`;
    Logger.info(log);
  }
}

import { Message } from 'discord.js';
import { Listener, Command } from 'discord-akairo';
import { Logger } from '../../structs/Logger';

export default class CommandCancelledListener extends Listener {
  public constructor() {
    super('commandCancelled', {
      emitter: 'commandHandler',
      event: 'commandCancelled'
    });
  }

  public exec(message: Message, command: Command) {
    const channel = message.guild
      ? `Guild: ${message.guild.name} (${message.guild.id})`
      : `DM: ${message.author.tag} (${message.author.id})`;
    const log = `Cancelled ${command.id} on ${channel}`;
    Logger.info(log);
  }
}

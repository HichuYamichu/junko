import { Message, TextChannel } from 'discord.js';
import { Listener } from 'discord-akairo';
import { Logger } from '../../structs/Logger';

export default class ErrorListener extends Listener {
  public constructor() {
    super('commandHandlerError', {
      emitter: 'commandHandler',
      event: 'error'
    });
  }

  public exec(err: Error, message: Message): void {
    Logger.error(err);
    if (
      message.guild &&
      !(message.channel as TextChannel).permissionsFor(this.client.user)!.has('SEND_MESSAGES')
    ) {
      return null;
    }
    message.util.reply('there was an error trying to execute that command!');
  }
}

import { Message, TextChannel } from 'discord.js';
import { Listener } from 'discord-akairo';

export default class ErrorListener extends Listener {
  constructor() {
    super('commandHandlerError', {
      emitter: 'commandHandler',
      event: 'error'
    });
  }

  exec(err: Error, message: Message) {
    this.client.logger.error(err);
    if (message.guild && !(message.channel as TextChannel).permissionsFor(this.client.user!)!.has('SEND_MESSAGES')) {
      return null;
    }
    return message.util!.reply('there was an error trying to execute that command!');
  }
}

module.exports = ErrorListener;

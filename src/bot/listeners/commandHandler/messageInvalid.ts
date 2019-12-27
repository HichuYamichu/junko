import { Message } from 'discord.js';
import { Listener } from 'discord-akairo';

export default class MessageInvalidListener extends Listener {
  public constructor() {
    super('messageInvalid', {
      emitter: 'commandHandler',
      event: 'messageInvalid'
    });
  }

  public async exec(message: Message) {
    if (
      message.util!.parsed!.command ||
      !message.guild ||
      !message.util!.parsed!.prefix ||
      !message.util!.parsed!.alias ||
      !message.util!.parsed!.afterPrefix
    ) { return; }
    const command = this.client.commandHandler.modules.get('tag-get');
    const args = await command!.parse(message, message.util!.parsed!.afterPrefix);
    return this.client.commandHandler.runCommand(message, command!, args);
  }
}

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Message, TextChannel } from 'discord.js';
import { Listener, Command } from 'discord-akairo';

export default class MissingPermissionsListener extends Listener {
  public constructor() {
    super('missingPermissions', {
      event: 'missingPermissions',
      emitter: 'commandHandler'
    });
  }

  public exec(message: Message, command: Command, type: string, missing: any): boolean {
    const canReply = message.guild ?
      (message.channel as TextChannel).permissionsFor(this.client.user).has('SEND_MESSAGES')
      : true;

    if (!canReply) {
      return;
    }

    if (type === 'client') {
      message.reply(`I'm missing ${missing} permission to use that command.`);
    } else {
      message.reply(`You are missing ${missing} permission to use that command.`);
    }
  }
}

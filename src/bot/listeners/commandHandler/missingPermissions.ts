import { Message, TextChannel, User } from 'discord.js';
import { Listener, Command } from 'discord-akairo';

export default class MissingPermissionsListener extends Listener {
  public constructor() {
    super('missingPermissions', {
      event: 'missingPermissions',
      emitter: 'commandHandler'
    });
  }

  public missingPermissions(channel: TextChannel, user: User, permissions: any) {
    const missingPerms = channel
      .permissionsFor(user)!
      .missing(permissions)
      .map(str => {
        if (str === 'VIEW_CHANNEL') return '`Read Messages`';
        if (str === 'SEND_TTS_MESSAGES') return '`Send TTS Messages`';
        if (str === 'USE_VAD') return '`Use VAD`';
        return `\`${str
          .replace(/_/g, ' ')
          .toLowerCase()
          .replace(/\b(\w)/g, char => char.toUpperCase())}\``;
      });

    return missingPerms.length > 1
      ? `${missingPerms.slice(0, -1).join(', ')} and ${missingPerms.slice(-1)[0]}`
      : missingPerms[0];
  }

  public exec(message: Message, command: Command, type: string, missing: any) {
    let text = '';
    let str = '';
    switch (type) {
      case 'client':
        str = this.missingPermissions(message.channel as TextChannel, this.client.user, missing);
        text = `I need ${str} permission for this command`;
        break;
      case 'user':
        str = this.missingPermissions(message.channel as TextChannel, message.author, missing);
        text = `You need ${str} permission for this command`;
        break;
    }

    if (!text) return;
    if (
      message.guild
        ? (message.channel as TextChannel).permissionsFor(this.client.user)!.has('SEND_MESSAGES')
        : true
    ) {
      message.reply(text);
    }
  }
}

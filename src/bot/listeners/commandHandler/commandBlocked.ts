import { Message, TextChannel } from 'discord.js';
import { Listener, Command } from 'discord-akairo';

export default class CommandBlockedListener extends Listener {
  public constructor() {
    super('commandBlocked', {
      event: 'commandBlocked',
      emitter: 'commandHandler'
    });
  }

  public async exec(message: Message, command: Command, reason: string) {
    const channel = message.guild
      ? `Guild: ${message.guild.name} (${message.guild.id})`
      : `DM: ${message.author!.tag} (${message.author!.id})`;
    const log = `Blocked ${command.id} on ${channel} reason: ${reason}`;
    this.client.logger.info(log);

    let responce = '';
    switch (reason) {
      case 'owner':
        responce = await this.client.replyManager.getReply(message, 'ownerOnly');
        break;
      case 'guild':
        responce = await this.client.replyManager.getReply(message, 'guildOnly');
        break;
      case 'blacklist':
        responce = await this.client.replyManager.getReply(message, 'blacklisted');
        break;
    }

    if (!responce) return;
    if (
      message.guild
        ? (message.channel as TextChannel).permissionsFor(this.client.user!)!.has('SEND_MESSAGES')
        : true
    ) {
      message.reply(responce);
    }
  }
}

import { Message } from 'discord.js';
import { Listener, Command } from 'discord-akairo';
import Logger from '../../structs/Logger';

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
    Logger.info(log);
    // @ts-ignore
    const responce = {
      owner: () => this.client.getReply(message, 'ownerOnly'),
      guild: () => this.client.getReply(message, 'guildOnly'),
      blacklist: () => this.client.getReply(message, 'blacklisted')
    }[reason];

    if (!responce) return;
    if (
    // @ts-ignore
      message.guild ? message.channel.permissionsFor(this.client.user).has('SEND_MESSAGES') : true
    ) {
      message.reply(await responce());
    }
  }
}

module.exports = CommandBlockedListener;

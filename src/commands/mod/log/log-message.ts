import { Message, TextChannel } from 'discord.js';
import { Command } from 'discord-akairo';

export default class LogSetCommand extends Command {
  public constructor() {
    super('log-message', {
      category: 'mod',
      ownerOnly: false,
      channel: 'guild',
      description: {
        content: 'Sets up a message log channel.',
        usage: '<channel>',
        examples: ['#logs', '506150345391603724']
      },
      args: [
        {
          id: 'chan',
          type: 'channel'
        }
      ],
      userPermissions: ['MANAGE_GUILD']
    });
  }

  public async exec(message: Message, { chan }: { chan: TextChannel }): Promise<void> {
    if (chan) {
      await this.client.settings.set(message.guild.id, 'messageLog', chan.id);
      message.util.send(`Message log enabled in ${chan}!`);
      return;
    }
    await this.client.settings.delete(message.guild.id, 'messageLog');
    message.util.send('Message log disabled.');
  }
}

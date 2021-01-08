import { Message, TextChannel } from 'discord.js';
import { Command } from 'discord-akairo';

export default class LogSetCommand extends Command {
  public constructor() {
    super('log-member', {
      category: 'mod',
      ownerOnly: false,
      channel: 'guild',
      description: {
        content: 'Sets up a member log channel.',
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
      await this.client.settings.set(message.guild.id, 'memberLog', chan.id);
      message.util.send(`Member log enabled in ${chan}!`);
      return;
    }
    await this.client.settings.delete(message.guild.id, 'memberLog');
    message.util.send('Member log disabled.');
  }
}

import { Message, TextChannel } from 'discord.js';
import { Command } from 'discord-akairo';

export default class LogSetCommand extends Command {
  constructor() {
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

  async exec(message: Message, { chan }: { chan: TextChannel }) {
    if (chan) {
      await message.client.settings.set(message.guild!.id, 'messageLog', chan.id);
      return message.util!.send(`Message log enabled in ${chan}!`);
    }
    await message.client.settings.del(message.guild!.id, 'messageLog');
    return message.util!.send('Message log disabled.');
  }
}

module.exports = LogSetCommand;

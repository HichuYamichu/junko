import { Message } from 'discord.js';
import { Command } from 'discord-akairo';

export default class TestCommand extends Command {
  constructor() {
    super('test', {
      aliases: ['test'],
      category: 'owner',
      ownerOnly: true,
      description: {
        content: 'For testing purposes.',
        usage: '',
        examples: []
      }
    });
  }

  // eslint-disable-next-line no-unused-vars
  async exec(message: Message, args: any) {
    this.client.emit('guildMemberRemove', message.member);
  }
}

module.exports = TestCommand;

const { Command } = require('discord-akairo');

class TestCommand extends Command {
  constructor() {
    super('test', {
      aliases: ['test'],
      category: 'owner',
      ownerOnly: true,
      channel: ['guild', 'dm'],
      description: {
        content: 'For testing purposes.',
        usage: '',
        examples: []
      }
    });
  }

  // eslint-disable-next-line no-unused-vars
  async exec(message, args) {
    // throw new Error('aaaaaaa');
  }
}

module.exports = TestCommand;

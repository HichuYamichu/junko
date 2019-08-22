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

  async exec(message, args) {

  }
}

module.exports = TestCommand;

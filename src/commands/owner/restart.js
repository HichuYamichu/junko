const { Command } = require('discord-akairo');

class RestartCommand extends Command {
  constructor() {
    super('restart', {
      aliases: ['restart'],
      ownerOnly: true,
      channel: ['guild', 'dm']
    });
  }

  async exec(message, args) {
    process.exit(1);
  }
}

module.exports = RestartCommand;

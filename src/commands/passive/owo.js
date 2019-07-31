const { Command } = require('discord-akairo');

class OwoCommand extends Command {
  constructor() {
    super('owo', {
      regex: /^(owo|uwu)$/i,
      channel: ['guild', 'dm']
    });
  }

  async exec(message, args) {
    message.util.send('Fuck you');
  }
}

module.exports = OwoCommand;

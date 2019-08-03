const { Command } = require('discord-akairo');

class OwoCommand extends Command {
  constructor() {
    super('owo', {
      category: 'passive',
      regex: /^(owo|uwu)$/i,
      channel: ['guild', 'dm']
    });
  }

  async exec(message, args) {
    return message.util.send('Fuck you');
  }
}

module.exports = OwoCommand;

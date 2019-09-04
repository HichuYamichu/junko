const { Command } = require('discord-akairo');

class OwoCommand extends Command {
  constructor() {
    super('owo', {
      category: 'passive',
      regex: /^(owo|uwu)$/i,
      channel: ['guild', 'dm']
    });
  }

  async exec(message) {
    const reply = await this.client.getReply(message, 'owo');
    return message.util.send(reply);
  }
}

module.exports = OwoCommand;

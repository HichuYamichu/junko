const { Command } = require('discord-akairo');

class gayCommand extends Command {
  constructor() {
    super('gay', {
      category: 'passive',
      regex: /\bI'?\s*a?m?\s*gay\b/i,
      channel: ['guild', 'dm']
    });
  }

  async exec(message) {
    const reply = await this.client.getReply(message, 'gay');
    return message.util.send(reply);
  }
}

module.exports = gayCommand;

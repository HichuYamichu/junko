const { Command } = require('discord-akairo');

class gayCommand extends Command {
  constructor() {
    super('gay', {
      category: 'passive',
      regex: /\bI'?\s*a?m?\s*gay\b/i,
      channel: ['guild', 'dm']
    });
  }

  async exec(message, args) {
    return message.util.send(this.client.replies.get('gay'));
  }
}

module.exports = gayCommand;

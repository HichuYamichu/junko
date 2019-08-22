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
    return this.client.replyManager.reply(message, 'gay');
  }
}

module.exports = gayCommand;

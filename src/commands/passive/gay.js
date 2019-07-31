const { Command } = require('discord-akairo');

class gayCommand extends Command {
  constructor() {
    super('gay', {
      regex: /\bI'?\s*a?m?\s*gay\b/i,
      channel: ['guild', 'dm']
    });
  }

  async exec(message, args) {
    message.util.send(this.client.replies.get('gay'));
  }
}

module.exports = gayCommand;

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
    const reply = await this.client.replyManager.getReply(message, 'gay');
    return message.util.send(reply);
  }
}

module.exports = gayCommand;

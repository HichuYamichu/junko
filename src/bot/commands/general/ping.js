const { Command } = require('discord-akairo');

class PingCommand extends Command {
  constructor() {
    super('ping', {
      aliases: ['ping'],
      category: 'general',
      ownerOnly: false,
      channel: ['guild', 'dm'],
      description: {
        content: 'Ping!',
        usage: '',
        examples: ['']
      }
    });
  }

  async exec(message) {
    const sent = await message.util.reply('Pong!');
    const timeDiff = (sent.editedAt || sent.createdAt) - (message.editedAt || message.createdAt);
    return message.util.reply([
      'Pong!',
      `Responce time: \`${timeDiff} ms\``,
      `Gateway latency: \`${Math.round(this.client.ws.ping)} ms\``
    ]);
  }
}

module.exports = PingCommand;

const { Command } = require('discord-akairo');

class ChatCommand extends Command {
  constructor() {
    super('chat', {
      aliases: ['chat'],
      category: 'general',
      ownerOnly: false,
      channel: ['guild', 'dm'],
      description: {
        content: '',
        usage: '',
        examples: ['']
      }
    });
  }

  async exec(message) {
    const userID = message.author.id + Date.now();
    const res = await this.client.rasa.sendAsync({ content: 'hi', userID });
    await message.util.send(res);
    for (;;) {
      try {
        const filter = m => m.author.id === message.author.id;
        const collected = await message.channel.awaitMessages(filter, {
          max: 1,
          time: 1000 * 20,
          errors: ['time']
        });
        const { content } = collected.first();
        if (content === 'stop' || 'end' || 'cancel') break;
        const res = await this.client.rasa.sendAsync({ content, userID });
        if (!res.content) continue;
        message.channel.send(res.content);
      } catch (e) {
        return message.util.sendNew('No input for 20 seconds. Closing the chat!');
      }
    }
  }
}

module.exports = ChatCommand;

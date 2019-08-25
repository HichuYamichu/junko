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
    message.util.send('Chat started!');
    for (;;) {
      try {
        const filter = m => m.author.id === message.author.id;
        const collected = await message.channel.awaitMessages(filter, {
          max: 1,
          time: 1000 * 10,
          errors: ['time']
        });
        const { content, author: { id } } = collected.first();
        console.log({ content, userID: id });
        if (content === 'stop') break;
        const res = await this.client.rasa.sendAsync({ content, userID: id });
        console.log(res);
        message.channel.send(res.content);
      } catch (e) {
        console.log(e);
        return message.util.sendNew("Time's up");
      }
    }
  }
}

module.exports = ChatCommand;

const { Command } = require('discord-akairo');

class GetTagCommand extends Command {
  constructor() {
    super('tag-get', {
      category: 'tags',
      ownerOnly: false,
      channel: 'guild',
      args: [
        {
          id: 'name',
          type: 'string',
          prompt: {
            start: message => `${message.author}, enter the tag name.`,
            retry: message => `${message.author}, you have to enter valid tag name.`
          }
        }
      ]
    });
  }

  async exec(message, { name }) {
    const tag = await this.client.store.hgetAsync(message.guild.id, `tag-${name}`);
    if (tag) {
      return message.util.send(tag);
    }
    return message.util.send('No such tag');
  }
}

module.exports = GetTagCommand;

const { Command } = require('discord-akairo');

class TagGetCommand extends Command {
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
    if (!name) return;
    const tag = await this.client.store.getTag(name);
    if (!tag) return;
    return message.util.send(tag);
  }
}

module.exports = TagGetCommand;

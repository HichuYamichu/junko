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
        },
        {
          id: 'silent',
          match: 'flag',
          flag: '--silent'
        }
      ]
    });
  }

  async exec(message, { name, silent }) {
    const tag = await this.client.store.getTag(message.guild.id, name);
    if (tag) {
      return message.util.send(tag);
    }
    if (silent) return;
    return message.util.send('No such tag');
  }
}

module.exports = TagGetCommand;

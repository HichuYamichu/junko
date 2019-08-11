const { Command } = require('discord-akairo');

class TagDelCommand extends Command {
  constructor() {
    super('tag-del', {
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
    const tag = await this.client.store.hdelAsync(`tags-${message.guild.id}`, name);
    if (tag) {
      return message.util.send(`Succesfuly deleted \`${name}\` `);
    }
    return message.util.send('No such tag');
  }
}

module.exports = TagDelCommand;

const { Command } = require('discord-akairo');

class TagAddCommand extends Command {
  constructor() {
    super('tag-add', {
      category: 'tags',
      ownerOnly: false,
      channel: 'guild',
      args: [
        {
          id: 'name',
          type: 'string',
          prompt: {
            start: message => `${message.author}, enter the tag name.`,
            retry: message =>
              `${message.author}, you have to enter tag name so you're able to find that it later.`
          }
        },
        {
          id: 'content',
          match: 'rest',
          prompt: {
            start: message => `${message.author}, enter tag content.`,
            retry: message => `${message.author}, tag must have some content.`
          }
        },
        {
          id: 'force',
          match: 'flag',
          flag: ['--force', '-f']
        }
      ]
    });
  }

  async exec(message, { name, content, force }) {
    if (!force) {
      const tag = await this.client.store.getTag(message.guild.id, name);
      if (tag) {
        return message.util.reply(
          `tag with name \`${name}\` already exists. You can overwire it by running the same command with \`--force\` flag`
        );
      }
    }
    await this.client.store.addTag(message.guild.id, name, content);
    return message.util.send('Tag succesfuly created');
  }
}

module.exports = TagAddCommand;

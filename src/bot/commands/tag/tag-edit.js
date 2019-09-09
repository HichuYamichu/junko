const { Command } = require('discord-akairo');

class TagEditCommand extends Command {
  constructor() {
    super('tag-edit', {
      category: 'tags',
      ownerOnly: false,
      channel: 'guild',
      args: [
        {
          id: 'name',
          type: 'lowercase',
          prompt: {
            start: 'Enter the tag name.',
            retry: 'You have to enter tag name you want to edit.'
          }
        },
        {
          id: 'content',
          match: 'rest',
          prompt: {
            start: 'Enter tag content.',
            retry: 'Tag must have some content.'
          }
        }
      ]
    });
  }

  async exec(message, { name, content }) {
    if (name && name.length >= 255) {
      return message.util.reply('tag name must be less then 255 characters.');
    }
    if (content && content.length >= 1900) {
      return message.util.reply('tag content must be less then 1900 characters (discord limits).');
    }

    const guildID = message.guild.id;
    const author = message.author.id;
    const tag = await this.client.store.Tag.findOne({ where: { name, guildID } });
    if (!tag) return message.util.reply("there's no such tag.");
    tag.toJSON();
    if (tag.author !== author && !this.client.isOwner(message.author)) {
      return message.util.reply('You must be this tag owner to edit it');
    }

    await this.client.store.Tag.update({ content }, { where: { tagID: tag.tagID } });
    return message.util.send('Tag succesfuly updated.');
  }
}

module.exports = TagEditCommand;

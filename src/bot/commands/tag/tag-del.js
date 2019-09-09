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
          type: 'lowercase',
          prompt: {
            start: 'Enter the tag name.',
            retry: 'You have to enter valid tag name.'
          }
        }
      ]
    });
  }

  async exec(message, { name }) {
    const guildID = message.guild.id;
    const tag = await this.client.store.Tag.findOne({ where: { name, guildID } });
    if (!tag) return message.util.reply("there's no such tag.");
    if (tag.author !== message.author.id) {
      return message.util.reply('you must be this tag owner to do that.');
    }
    await this.client.store.Tag.destroy({
      where: {
        guildID,
        name
      }
    });
    return message.util.send(`Succesfuly deleted \`${name}\`.`);
  }
}

module.exports = TagDelCommand;

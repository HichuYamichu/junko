const { Command } = require('discord-akairo');
const { search } = require('kaori');

class ImageCommand extends Command {
  constructor() {
    super('image', {
      aliases: ['image', 'pic'],
      ownerOnly: false,
      channel: ['guild', 'dm'],
      args: [
        {
          id: 'tags',
          type: 'content'
        }
      ],
      clientPermissions: ['ATTACH_FILES']
    });
  }

  async exec(message, { tags }) {
    const rating = message.channel.nsfw ? 'rating%3aexplicit' : 'rating%3Asafe';

    const [result] = await search('gelbooru', {
      tags: [rating, tags],
      limit: 1,
      random: true
    });
    if (!result) {
      message.util.send(
        "No results! Are you sure your query is correct? Read https://danbooru.donmai.us/wiki_pages/43049 and if you still think it's not your fault notify the bot creator"
      );
    }
    message.util.send({ files: [result.fileURL] });
  }
}

module.exports = ImageCommand;

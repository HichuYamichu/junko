const { Command } = require('discord-akairo');
const { search } = require('kaori');

class ImageCommand extends Command {
  constructor() {
    super('image', {
      aliases: ['image', 'pic'],
      category: 'general',
      ownerOnly: false,
      channel: ['guild', 'dm'],
      description: {
        content:
          'Sends a random image (always SFW on non-NSFW channels and always NSFW on NSFW channels)!',
        usage: '<valid booru tags>',
        examples: ['image junko_(touhou)', 'image hug blonde_hair']
      },
      args: [
        {
          id: 'tags',
          type: 'content',
          prompt: {
            start: 'Provide valid booru tags in order to search for an image.',
            retry: 'You have to input at least something.'
          }
        }
      ],
      clientPermissions: ['ATTACH_FILES']
    });
  }

  async exec(message, { tags }) {
    const rating = message.channel.nsfw ? 'rating%3aexplicit' : 'rating%3Asafe';

    try {
      const [result] = await search('gelbooru', {
        tags: [rating, tags],
        limit: 1,
        random: true
      });
      if (!result) {
        return message.util.send(
          'No results! Are you sure your query is correct? Read https://danbooru.donmai.us/wiki_pages/43049.'
        );
      }
      return message.util.send({ files: [result.fileURL] });
    } catch (e) {
      return message.util.send(
        'Error! Probably invalid search query. Read https://danbooru.donmai.us/wiki_pages/43049.'
      );
    }
  }
}

module.exports = ImageCommand;

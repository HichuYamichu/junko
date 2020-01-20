import { Message, TextChannel } from 'discord.js';
import { Command } from 'discord-akairo';
import { search } from 'kaori';

export default class ImageCommand extends Command {
  public constructor() {
    super('image', {
      aliases: ['image', 'pic'],
      category: 'general',
      ownerOnly: false,
      description: {
        content:
          'Sends a random image (SFW on non-NSFW channels and NSFW on NSFW channels)!',
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

  public async exec(message: Message, { tags }: { tags: string }) {
    const rating = (message.channel as TextChannel).nsfw ? 'rating%3aexplicit' : 'rating%3Asafe';

    try {
      const [result] = await search('gelbooru', {
        tags: [rating, tags],
        limit: 1,
        random: true
      });
      if (!result) {
        return message.util!.send(
          // eslint-disable-next-line max-len
          'No results! Are you sure your query is correct? Read https://danbooru.donmai.us/wiki_pages/43049.'
        );
      }
      return message.util!.send({ files: [result.fileURL] });
    } catch (e) {
      return message.util!.send(
        'Error! Probably invalid search query. Read https://danbooru.donmai.us/wiki_pages/43049.'
      );
    }
  }
}

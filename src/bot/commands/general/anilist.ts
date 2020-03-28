import { Message } from 'discord.js';
import { Command } from 'discord-akairo';
import axios from 'axios';

export default class AnilistCommand extends Command {
  public constructor() {
    super('anilist', {
      aliases: ['anilist', 'ani'],
      category: 'general',
      ownerOnly: false,
      description: {
        content: 'Searches anilist for manga/anime.',
        usage: '<type> <query>',
        examples: ['anime Gantz', 'a Shinigami no Ballad', 'manga Berserk', 'm Slam Dunk']
      },
      args: [
        {
          id: 'type',
          type: [['ANIME', 'a', 'ani'], ['MANGA', 'm', 'mango']],
          prompt: {
            start: 'Choose what type of media you want to search (anime/manga).',
            retry: 'Only manga/anime available.'
          }
        },
        {
          id: 'search',
          match: 'rest',
          prompt: {
            start: 'Provide search query.',
            retry: 'Provide valid search query.'
          }
        }
      ]
    });
  }

  public async exec(message: Message, { search, type }: { search: string; type: string }) {
    const url = 'https://graphql.anilist.co';
    const query = `query ($search: String, $type: MediaType) {
      Media (search: $search, type: $type) {
        id
      }
    }`;
    const variables = { search, type };

    try {
      const {
        data: { data }
      } = await axios.post(url, { query, variables });
      return message.util.send(`https://anilist.co/${type.toLowerCase()}/${data.Media.id}`);
    } catch (err) {
      const msg = err.response.status === 404 ? 'Nothing found!' : 'Unknown problem occurred!';
      return message.util.send(msg);
    }
  }
}

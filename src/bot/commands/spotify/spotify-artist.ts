import { Message } from 'discord.js';
import { Command } from 'discord-akairo';

export default class SpotifyArtistCommand extends Command {
  constructor() {
    super('spotify-artist', {
      category: 'spotify',
      ownerOnly: false,
      args: [
        {
          id: 'artist',
          match: 'content',
          prompt: {
            start: 'Input artist name.',
            retry: 'You have to provide artist name.'
          }
        }
      ]
    });
  }

  async exec(message: Message, { artist }: { artist: string }) {
    const res = await this.client.APIManager.spotify.searchArtists(artist, { limit: 1 });
    if (!res.body.artists.items.length) {
      return message.util!.reply('Nothing found!');
    }
    return message.util!.send(`https://open.spotify.com/artist/${res.body.artists.items[0].id}`);
  }
}

module.exports = SpotifyArtistCommand;

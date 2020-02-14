import { Message } from 'discord.js';
import { Command } from 'discord-akairo';

export default class SpotifyTrackCommand extends Command {
  public constructor() {
    super('spotify-track', {
      category: 'spotify',
      ownerOnly: false,
      args: [
        {
          id: 'track',
          match: 'content',
          prompt: {
            start: 'Input track name.',
            retry: 'You have to provide track name.'
          }
        }
      ]
    });
  }

  public async exec(message: Message, { track }: {track: string}) {
    const res = await this.client.apiManager.spotify.searchTracks(track, { limit: 1 });
    if (!res.body.tracks!.items.length) {
      return message.util!.reply('Nothing found!');
    }
    return message.util!.send(`https://open.spotify.com/track/${res.body.tracks!.items[0].id}`);
  }
}

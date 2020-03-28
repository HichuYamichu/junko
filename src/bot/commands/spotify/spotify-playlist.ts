import { Message } from 'discord.js';
import { Command } from 'discord-akairo';

export default class SpotifyPlaylistCommand extends Command {
  public constructor() {
    super('spotify-playlist', {
      category: 'spotify',
      ownerOnly: false,
      description: {
        content: 'searches spotify for an playlist',
        usage: '<playlist name>',
        examples: ['jpegmafia']
      },
      args: [
        {
          id: 'playlist',
          match: 'content',
          prompt: {
            start: 'Input playlist name.',
            retry: 'You have to provide playlist name.'
          }
        }
      ]
    });
  }

  public async exec(message: Message, { playlist }: { playlist: string }) {
    const res = await this.client.apiManager.spotify.searchPlaylists(playlist, { limit: 1 });
    if (!res.body.playlists.items.length) {
      return message.util.reply('Nothing found!');
    }
    return message.util.send(
      `https://open.spotify.com/playlist/${res.body.playlists.items[0].id}`
    );
  }
}

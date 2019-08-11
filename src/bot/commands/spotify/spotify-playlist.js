const { Command } = require('discord-akairo');

class SpotifyPlaylistCommand extends Command {
  constructor() {
    super('spotify-playlist', {
      category: 'spotify',
      ownerOnly: false,
      channel: ['guild', 'dm'],
      args: [
        {
          id: 'playlist',
          match: 'content',
          prompt: {
            start: message => `${message.author}, input playlist name.`,
            retry: message => `${message.author}, you have to provide playlist name.`
          }
        }
      ]
    });
  }

  async exec(message, { playlist }) {
    const res = await message.client.spotify.searchPlaylists(playlist, { limit: 1 });
    if (!res.body.playlists.items.length) {
      return message.util.reply('Nothing found!');
    }
    return message.util.send(`https://open.spotify.com/playlist/${res.body.playlists.items[0].id}`);
  }
}

module.exports = SpotifyPlaylistCommand;
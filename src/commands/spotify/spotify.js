const { Command, Flag } = require('discord-akairo');

class SpotifyCommand extends Command {
  constructor() {
    super('spotify', {
      category: 'spotify',
      aliases: ['spotify'],
      channel: 'guild',
      description: {
        content: 'Searches Spotify for specific content.',
        usage: '[artist | album | track | playlist] <query>',
        examples: [
          'artist jpegmafia',
          "track baby i'm bleeding",
          "track artist:jpegmafia track:baby i'm bleeding",
          'album Black Ben Carson',
          'playlist jpegmafia'
        ]
      }
    });
  }

  *args() {
    const method = yield {
      type: [
        ['spotify-artist', 'artist'],
        ['spotify-album', 'album'],
        ['spotify-track', 'track', 'song'],
        ['spotify-playlist', 'playlist']
      ],
      otherwise: () => 'You must specify a content type see `help spotify` for more info'
    };

    return Flag.continue(method);
  }
}

module.exports = SpotifyCommand;

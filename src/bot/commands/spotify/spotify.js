const { Command, Flag } = require('discord-akairo');
const { stripIndents } = require('common-tags');

class SpotifyCommand extends Command {
  constructor() {
    super('spotify', {
      category: 'spotify',
      aliases: ['spotify'],
      channel: 'guild',
      description: {
        content: stripIndents`Use one of the following:
        • album \`<name>\`
        • artist \`<name>\`
        • track \`<name>\`
        • track \`artist:<name> track:<name>\`
        • playlist \`<name>\``,
        usage: '<method> <...args>',
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
    if (!this.client.APIManager.spotify) return Flag.continue('not-enabled');

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

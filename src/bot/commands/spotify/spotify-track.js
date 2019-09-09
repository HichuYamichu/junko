const { Command } = require('discord-akairo');

class SpotifyTrackCommand extends Command {
  constructor() {
    super('spotify-track', {
      category: 'spotify',
      ownerOnly: false,
      channel: ['guild', 'dm'],
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

  async exec(message, { track }) {
    const res = await message.client.APIs.spotify.searchTracks(track, { limit: 1 });
    if (!res.body.tracks.items.length) {
      return message.util.reply('Nothing found!');
    }
    return message.util.send(`https://open.spotify.com/track/${res.body.tracks.items[0].id}`);
  }
}

module.exports = SpotifyTrackCommand;

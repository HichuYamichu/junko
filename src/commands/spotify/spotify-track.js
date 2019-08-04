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
            start: message => `${message.author}, input track name.`,
            retry: message => `${message.author}, you have to provide track name.`
          }
        }
      ]
    });
  }

  async exec(message, { track }) {
    const res = await message.client.spotify.searchTracks(track, { limit: 1 });
    if (!res.body.tracks.items.length) {
      return message.util.reply('Nothing found! Check command usage if problem reoccurs.');
    }
    return message.util.send(`https://open.spotify.com/track/${res.body.tracks.items[0].id}`);
  }
}

module.exports = SpotifyTrackCommand;

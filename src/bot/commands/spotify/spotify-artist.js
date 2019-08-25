const { Command } = require('discord-akairo');

class SpotifyArtistCommand extends Command {
  constructor() {
    super('spotify-artist', {
      category: 'spotify',
      ownerOnly: false,
      channel: ['guild', 'dm'],
      args: [
        {
          id: 'artist',
          match: 'content',
          prompt: {
            start: message => `${message.author}, input artist name.`,
            retry: message => `${message.author}, you have to provide artist name.`
          }
        }
      ]
    });
  }

  async exec(message, { artist }) {
    const res = await message.client.spotify.searchArtists(artist, { limit: 1 });
    if (!res.body.artists.items.length) {
      return message.util.reply('Nothing found!');
    }
    return message.util.send(`https://open.spotify.com/artist/${res.body.artists.items[0].id}`);
  }
}

module.exports = SpotifyArtistCommand;

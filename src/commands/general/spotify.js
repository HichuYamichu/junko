const { Command } = require('discord-akairo');

class SpotifyCommand extends Command {
  constructor() {
    super('spotify', {
      aliases: ['spotify'],
      ownerOnly: false,
      util: ['guild', 'dm'],
      args: [
        {
          id: 'option',
          type: ['song', 'artist', 'album', 'playlist']
        },
        {
          id: 'query',
          match: 'rest'
        }
      ]
    });
  }

  async exec(message, { option, query }) {
    let res;
    switch (option) {
    case 'song':
      res = await message.client.spotify.searchTracks(query, { limit: 1 });
      if (!res.body.tracks.items.length) {
        return message.util.reply('Nothing found! Check command usage if problem reoccurs.');
      }
      message.util.send(`https://open.spotify.com/track/${res.body.tracks.items[0].id}`);
      break;

    case 'artist':
      res = await message.client.spotify.searchArtists(query, { limit: 1 });
      if (!res.body.artists.items.length) {
        return message.util.reply('Nothing found! Check command usage if problem reoccurs.');
      }
      message.util.send(`https://open.spotify.com/artist/${res.body.artists.items[0].id}`);
      break;

    case 'album':
      res = await message.client.spotify.searchAlbums(query, { limit: 1 });
      if (!res.body.albums.items.length) {
        return message.util.reply('Nothing found! Check command usage if problem reoccurs.');
      }
      message.util.send(`https://open.spotify.com/album/${res.body.albums.items[0].id}`);
      break;

    case 'playlist':
      res = await message.client.spotify.searchPlaylists(query, { limit: 1 });
      if (!res.body.playlists.items.length) {
        return message.util.reply('Nothing found! Check command usage if problem reoccurs.');
      }
      message.util.send(`https://open.spotify.com/playlist/${res.body.playlists.items[0].id}`);
      break;

    default:
      return message.util.reply(`Unknown option: \`${option}\``);
    }
  }
}

module.exports = SpotifyCommand;

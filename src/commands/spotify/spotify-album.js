const { Command } = require('discord-akairo');

class SpotifyAlbumCommand extends Command {
  constructor() {
    super('spotify-album', {
      category: 'spotify',
      ownerOnly: false,
      channel: ['guild', 'dm'],
      args: [
        {
          id: 'album',
          match: 'content',
          prompt: {
            start: message => `${message.author}, input album name.`,
            retry: message => `${message.author}, you have to provide album name.`
          }
        }
      ]
    });
  }

  async exec(message, { album }) {
    const res = await message.client.spotify.searchAlbums(album, { limit: 1 });
    if (!res.body.albums.items.length) {
      return message.util.reply('Nothing found!');
    }
    return message.util.send(`https://open.spotify.com/album/${res.body.albums.items[0].id}`);
  }
}

module.exports = SpotifyAlbumCommand;

module.exports = {
  name: 'spotify',
  description: 'Searches spotify for songs/artists/albums/playlists.',
  args: 2,
  usage: '[artist | song | album | playlist] <query>',
  examples: ['spotify artist Death Grips', 'spotify song Guillotine', 'spotify song artist:Death Grips track:Guillotine'],
  guildOnly: false,
  cooldown: 5,
  aliases: ['spot'],
  permissionLVL: 0,
  async execute(message, args) {
    const { UserError } = message.client;

    const type = args[0].toLowerCase();
    const query = args.slice(1).join(' ');
    let res;

    switch (type) {
    case 'artist':
      res = await message.client.spotify.searchArtists(query, { limit: 1 });
      if (!res.body.artists.items.length) {
        throw new UserError('Nothing found! Check command usage if problem reoccurs.');
      }
      message.channel.send(`https://open.spotify.com/artist/${res.body.artists.items[0].id}`);
      break;

    case 'song':
      console.log(query);
      res = await message.client.spotify.searchTracks(query, { limit: 1 });
      if (!res.body.tracks.items.length) {
        throw new UserError('Nothing found! Check command usage if problem reoccurs.');
      }
      message.channel.send(`https://open.spotify.com/track/${res.body.tracks.items[0].id}`);
      break;

    case 'album':
      res = await message.client.spotify.searchAlbums(query, { limit: 1 });
      if (!res.body.albums.items.length) {
        throw new UserError('Nothing found! Check command usage if problem reoccurs.');
      }
      message.channel.send(`https://open.spotify.com/album/${res.body.albums.items[0].id}`);
      break;

    case 'playlist':
      res = await message.client.spotify.searchPlaylists(query, { limit: 1 });
      if (!res.body.playlists.items.length) {
        throw new UserError('Nothing found! Check command usage if problem reoccurs.');
      }
      message.channel.send(`https://open.spotify.com/playlist/${res.body.playlists.items[0].id}`);
      break;

    default:
      throw new UserError('Invalid type (artist, song, album, playlist supported)!');
    }
  }
};

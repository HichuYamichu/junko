require('dotenv').config();
const Junko = require('./client/JunkoClient');

const client = new Junko({
  ownerID: process.env.OWNER_ID,
  YouTubeSecret: process.env.YT_KEY,
  SpotifyID: process.env.SPOTIFY_ID,
  SpotifySecret: process.env.SPOTIFY_SECRET,
  token: process.env.TOKEN
});
client.start();

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});

require('dotenv').config();
const JunkoClient = require('./client/JunkoClient');

const client = new JunkoClient({
  ownerID: process.env.OWNER_ID,
  YouTubeSecret: process.env.YT_KEY,
  SpotifyID: process.env.SPOTIFY_ID,
  SpotifySecret: process.env.SPOTIFY_SECRET,
  token: process.env.TOKEN,
  redisURI: process.env.REDIS_URI
});

client.on('disconnect', () => console.warn('Disconnected'))
  .on('reconnect', () => console.info('Reconnecting'))
  .on('error', err => console.error(err))
  .on('warn', info => console.warn(info));

client.start();

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});

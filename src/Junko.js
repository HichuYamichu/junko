require('dotenv').config();
const moment = require('moment');
const JunkoClient = require('./client/JunkoClient');

const client = new JunkoClient({
  ownerID: process.env.OWNER_ID,
  YouTubeSecret: process.env.YT_KEY,
  SpotifyID: process.env.SPOTIFY_ID,
  SpotifySecret: process.env.SPOTIFY_SECRET,
  token: process.env.TOKEN,
  redisURI: process.env.REDIS_URI
});

client
  .on('warn', m => client.logger.warn(m))
  .on('error', m => client.logger.error(m))
  .on('reconnect', () => client.logger.info('Reconnecting'));

client.start();

const now = () => moment.utc().format('DD-MM-YYYY[\n]HH:mm:ss');

process.on('exit', () => {
  client.store.set('LastRestart', `${now()} UTC`);
});

process.on('SIGINT', () => {
  client.store.set('LastRestart', `${now()} UTC`);
});

require('dotenv').config();
const JunkoClient = require('./client/JunkoClient');

const client = new JunkoClient({
  ownerID: process.env.OWNER_ID,
  YouTubeSecret: process.env.YT_KEY,
  SpotifyID: process.env.SPOTIFY_ID,
  SpotifySecret: process.env.SPOTIFY_SECRET,
  token: process.env.TOKEN,
  redisURI: process.env.REDIS_URI,
  color: '#fc2041'
});

client
  .on('warn', m => client.logger.warn(m))
  .on('error', m => client.logger.error(m))
  .on('reconnect', () => client.logger.info('Reconnecting'));

client.start();

process.on('exit', () => {
  client.store.saveProcessExitDate();
});

process.on('SIGINT', () => {
  client.store.saveProcessExitDate();
});

process.on('unhandledRejection', reason => {
  client.logger.error(reason);
});

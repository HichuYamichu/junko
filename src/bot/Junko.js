require('dotenv').config();
const JunkoClient = require('./client/JunkoClient');

const client = new JunkoClient({
  ownerID: process.env.OWNER_ID,
  token: process.env.TOKEN,
  color: '#fc2041'
});

client
  .on('warn', m => client.logger.warn(m))
  .on('error', m => client.logger.error(m))
  .on('reconnect', () => client.logger.info('Reconnecting'));

client.start();

process.on('unhandledRejection', reason => {
  client.logger.error(reason);
});

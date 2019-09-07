require('dotenv').config();
const JunkoClient = require('./client/JunkoClient');

const client = new JunkoClient({
  ownerID: process.env.OWNER_ID,
  token: process.env.TOKEN,
  color: '#fc2041',
  defaultPrefix: '!',
  defaultPreset: 'junko'
});

client.start();

process.on('unhandledRejection', reason => {
  client.logger.error(reason);
});

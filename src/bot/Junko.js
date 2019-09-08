require('dotenv').config();
const JunkoClient = require('./client/JunkoClient');

const client = new JunkoClient({
  ownerID: process.env.OWNER_ID,
  token: process.env.TOKEN,
  color: '#f271cd',
  defaultPrefix: '!',
  defaultPreset: 'junko'
});

client.start();

process.on('unhandledRejection', reason => {
  client.logger.error(reason);
});

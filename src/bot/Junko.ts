// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();
import JunkoClient from './client/JunkoClient';
import Logger from './structs/Logger';

const client = new JunkoClient({
  ownerID: process.env.OWNER_ID!,
  token: process.env.TOKEN!,
  color: '#f271cd',
  defaultPrefix: '!',
  defaultPreset: 'junko'
});

client.start();

process.on('unhandledRejection', reason => {
  Logger.error(reason);
});

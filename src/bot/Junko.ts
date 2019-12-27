// tslint:disable-next-line: no-var-requires
require('dotenv').config();
import JunkoClient from './client/JunkoClient';
import Logger from './structs/Logger';

const client = new JunkoClient({
  ownerID: process.env.OWNER_ID!,
  token: process.env.TOKEN!,
  color: process.env.COLOR || '#f271cd',
  defaultPrefix: process.env.PREFIX || '!',
  defaultPreset: process.env.PRESET || 'junko'
});

client.start();

process.on('unhandledRejection', reason => {
  Logger.error(reason);
});

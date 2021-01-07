import * as dotenv from 'dotenv';
dotenv.config();
import JunkoClient from './client/JunkoClient';
import { Config } from './structs/Config';
import { Logger } from './structs/Logger';

const client = new JunkoClient(new Config());

client.start();

process.on('unhandledRejection', reason => {
  Logger.error(reason);
});

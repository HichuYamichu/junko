import * as dotenv from 'dotenv';
dotenv.config();
import JunkoClient from './client/JunkoClient';
import { Config } from './models/Config';
import { Database } from './structs/Database';
import { Logger } from './structs/Logger';
import { prompt } from 'prompts';

(async () => {
  const db = await new Database().get('junko').connect();
  const repo = db.getRepository(Config);
  let config = await repo.findOne();

  if (config === undefined) {
    config = new Config();
    const questions = [
      {
        type: 'password',
        name: 'token',
        message: 'Enter token'
      },
      {
        type: 'text',
        name: 'ownerId',
        message: 'Enter owner Id'
      },
      {
        type: 'text',
        name: 'color',
        message: 'Enter color (in hex)',
        initial: '#f271cd'
      },
      {
        type: 'text',
        name: 'defaultPrefix',
        message: 'Enter default prefix',
        initial: '>'
      },
      {
        type: 'text',
        name: 'defaultPreset',
        message: 'Enter reply text preset',
        initial: 'junko'
      },
      {
        type: 'text',
        name: 'myriagURL',
        message: 'Enter Myriag URL',
      }
    ];

    const response = await prompt(questions);
    if (Object.keys(response).length < 6) {
      process.exit();
    }

    config.token = response.token;
    config.ownerId = response.ownerId;
    config.color = response.color;
    config.defaultPrefix = response.defaultPrefix;
    config.defaultPreset = response.defaultPreset;
    config.myriagURL = response.myriagURL;

    await repo.save(config);
  }

  const client = new JunkoClient(db, config);

  client.start();

  process.on('unhandledRejection', reason => {
    Logger.error(reason);
  });
})();

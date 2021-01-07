import { ConnectionManager } from 'typeorm';
import { Tag } from '../models/Tag';
import { Settings } from '../models/Settings';
import { Config } from './Config';

export class Database extends ConnectionManager {
  constructor(conf: Config) {
    super();
    super.create({
      name: 'junko',
      type: 'postgres',
      host: conf.postgresHost,
      username: conf.postgresUsername,
      password: conf.postgresPassword,
      database: conf.postgresDatabase,
      entities: [Settings, Tag],
      synchronize: true
    });
  }
}

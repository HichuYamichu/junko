import { ConnectionManager } from 'typeorm';
import { Tag } from '../models/Tag';
import { Settings } from '../models/Settings';
import { Config } from '../models/Config';
import { Privileged } from '../models/Privileged';

export class Database extends ConnectionManager {
  public constructor() {
    super();
    super.create({
      name: 'junko',
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Settings, Tag, Config, Privileged],
      synchronize: true
    });
  }
}

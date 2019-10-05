import { ConnectionManager } from 'typeorm';
import { Tag } from '../models/Tag';
import { Settings } from '../models/Settings';

const connectionManager = new ConnectionManager();
connectionManager.create({
  name: 'junko',
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Settings, Tag],
  synchronize: true
});

export default connectionManager;

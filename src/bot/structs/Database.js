const logger = require('./Logger');
const { join } = require('path');
const bluebird = require('bluebird');
const redis = require('redis');
const Sequelize = require('sequelize');
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const cache = redis.createClient({ host: process.env.REDIS_HOST });
bluebird.promisifyAll(cache);

const db = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    logging: false
  }
);

module.exports = class Database {
  static async init() {
    try {
      await db.authenticate();
      const modelsPath = join(__dirname, '..', 'models');
      const files = await readdir(modelsPath);

      for (const file of files) {
        const filePath = join(modelsPath, file);
        if (!filePath.endsWith('.js')) continue;
        await require(filePath).sync({ alter: true });
      }
    } catch (e) {
      logger.error(e);
      process.exit(1);
    }
  }

  static get db() {
    return db;
  }

  static get cache() {
    return cache;
  }
};

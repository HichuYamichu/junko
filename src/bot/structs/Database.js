const { join } = require('path');
const bluebird = require('bluebird');
const redis = require('redis');
const Sequelize = require('sequelize');
const readdir = require('util').promisify(require('fs').readdir);
const cache = redis.createClient();
bluebird.promisifyAll(cache);

const db = new Sequelize('postgres', 'postgres', 'changeme', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

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
      console.log(e);
    }
  }

  static get db() {
    return db;
  }

  static get cache() {
    return cache;
  }
};

const { Guild } = require('discord.js');
const { cache } = require('./Database');
const Settings = require('../models/Settings');

module.exports = class SettingsProvider {
  async get(guild, key, defaultValue) {
    const id = this.constructor.getGuildID(guild);
    const cached = await this.constructor.getCached(id, key);
    if (cached) return cached;

    const res = await Settings.findByPk(id, { attributes: [key] });
    if (!res) return defaultValue;

    res.toJSON();
    const value = res[key];
    if (!value) return defaultValue;

    await this.constructor.setCache(id, key, value);
    return value;
  }

  async set(guild, key, value) {
    const id = this.constructor.getGuildID(guild);
    await this.constructor.delCached(id, key);
    const data = { guildID: id };
    data[key] = value;
    return Settings.upsert(data);
  }

  async clear(guild) {
    const id = this.constructor.getGuildID(guild);
    await this.constructor.clearCached(id);
    return Settings.destroy({ where: { guildID: id } });
  }

  static getCached(id, key) {
    return cache.hget(id, key);
  }

  static setCache(id, key, data) {
    const cacheObject = typeof data === 'object' ? JSON.stringify(data) : data;
    return cache.hset(id, key, cacheObject);
  }

  static delCached(id, key) {
    return cache.hdel(id, key);
  }

  static clearCached(id) {
    return cache.del(id);
  }

  static getGuildID(guild) {
    if (guild instanceof Guild) return guild.id;
    if (typeof guild === 'string' && /^\d+$/.test(guild)) return guild;
    throw new TypeError('Invalid guild. Must be a Guild instance or guild ID');
  }
};

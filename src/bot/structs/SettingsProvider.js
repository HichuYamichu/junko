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
    const data = { guildID: id, [key]: value };
    return Settings.upsert(data);
  }

  async del(guild, key) {
    const id = this.constructor.getGuildID(guild);
    await this.constructor.delCached(id, key);
    const data = { [key]: null };
    return Settings.update(data, { where: { guildID: id } });
  }

  async clear(guild) {
    const id = this.constructor.getGuildID(guild);
    await this.constructor.clearCached(id);
    return Settings.destroy({ where: { guildID: id } });
  }

  static getCached(id, key) {
    if (cache.status !== 'ready') return null;
    return cache.hget(id, key);
  }

  static setCache(id, key, data) {
    if (cache.status !== 'ready') return null;
    const cacheObject = typeof data === 'object' ? JSON.stringify(data) : data;
    return cache.hset(id, key, cacheObject);
  }

  static delCached(id, key) {
    if (cache.status !== 'ready') return null;
    return cache.hdel(id, key);
  }

  static clearCached(id) {
    if (cache.status !== 'ready') return null;
    return cache.del(id);
  }

  static getGuildID(guild) {
    if (guild instanceof Guild) return guild.id;
    if (typeof guild === 'string' && /^\d+$/.test(guild)) return guild;
    if (!guild) return 'global';
    throw new TypeError('Invalid guild.');
  }
};

const { Guild } = require('discord.js');
const { SequelizeProvider } = require('discord-akairo');
const { cache } = require('./Database');
const Settings = require('../models/Settings');
const Tag = require('../models/Tag');

module.exports = class Store extends SequelizeProvider {
  constructor() {
    super(Settings, {
      idColumn: 'guildID',
      dataColumn: 'settings'
    });
  }

  get Tag() {
    return Tag;
  }

  async get(guild, key, defaultValue) {
    const id = this.constructor.getGuildID(guild);
    const cached = await this.constructor.checkCache(id, key);
    if (cached) return cached;
    const res = await super.get(id, key, defaultValue);
    if (res !== defaultValue) await this.constructor.saveToCache(id, key, res);
    return res;
  }

  set(guild, key, value) {
    const id = this.constructor.getGuildID(guild);
    this.constructor.invalidateCacheValue(id, key);
    return super.set(id, key, value);
  }

  delete(guild, key) {
    const id = this.constructor.getGuildID(guild);
    this.constructor.invalidateCacheValue(id, key);
    return super.delete(id, key);
  }

  clear(guild) {
    const id = this.constructor.getGuildID(guild);
    this.constructor.removeCacheEntry(id);
    return super.clear(id);
  }

  static checkCache(id, key) {
    return cache.hget(id, key);
  }

  static saveToCache(id, key, data) {
    const cacheObject = typeof data === 'object' ? JSON.stringify(data) : data;
    return cache.hset(id, key, cacheObject);
  }

  static invalidateCacheValue(id, key) {
    return cache.hdel(id, key);
  }

  static removeCacheEntry(id) {
    return cache.del(id);
  }

  static getGuildID(guild) {
    if (guild instanceof Guild) return guild.id;
    if (typeof guild === 'string' && /^\d+$/.test(guild)) return guild;
    throw new TypeError('Invalid guild. Must be a Guild instance or guild ID');
  }
};

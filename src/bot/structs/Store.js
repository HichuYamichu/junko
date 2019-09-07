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

  getGuildPrefix(guild, defaultValue) {
    return this.get(guild, 'prefix', defaultValue);
  }

  setGuildPrefix(guild, prefix) {
    return this.set(guild, 'prefix', prefix);
  }

  getGuildPreset(guild, defaultValue) {
    return this.get(guild, 'preset', defaultValue);
  }

  setGuildPreset(guild, preset) {
    return this.set(guild, 'preset', preset);
  }

  async getBlacklist(guild, defaultValue) {
    const res = await this.get(guild, 'blacklist', defaultValue);
    const blacklist = typeof res === 'string' ? JSON.parse(res) : res;
    return blacklist;
  }

  setBlacklist(guild, blacklist) {
    return this.set(guild, 'blacklist', blacklist);
  }

  getModChannel(guild, defaultValue) {
    return this.get(guild, 'modChannel', defaultValue);
  }

  setModChannel(guild, channelID) {
    return this.set(guild, 'modChannel', channelID);
  }

  delModChannel(guild) {
    return this.delete(guild, 'modChannel');
  }

  removeGuildConfig(guild) {
    return this.clear(guild);
  }

  async getTag(name) {
    const res = await Tag.findOne({ where: { name } });
    if (res) return res.toJSON();
    return null;
  }

  addTag(name, content) {
    return Tag.create({ name, content });
  }

  deleteTag(name) {
    return Tag.destroy({
      where: {
        name
      }
    });
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
    return cache.hgetAsync(`settings_${id}`, key);
  }

  static saveToCache(id, key, data) {
    const cacheObject = typeof data === 'object' ? JSON.stringify(data) : data;
    return cache.hsetAsync(`settings_${id}`, key, cacheObject);
  }

  static invalidateCacheValue(id, key) {
    return cache.hdelAsync(`settings_${id}`, key);
  }

  static removeCacheEntry(id) {
    return cache.delAsync(`settings_${id}`);
  }

  static getGuildID(guild) {
    if (guild instanceof Guild) return guild.id;
    if (guild === 'global' || guild === null) return 'global';
    if (typeof guild === 'string' && /^\d+$/.test(guild)) return guild;
    throw new TypeError(
      'Invalid guild specified. Must be a Guild instance, guild ID, "global", or null.'
    );
  }
};

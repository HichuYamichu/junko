const moment = require('moment');
const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis);

let store;

module.exports = class Store {
  static _init(host) {
    store = redis.createClient({ host });
  }

  static setGuildPrefix(guildID, prefix) {
    return store.hsetAsync(guildID, 'prefix', prefix);
  }

  static async getGuildPrefix({ guild }) {
    if (guild) {
      const prefix = await store.hgetAsync(guild.id, 'prefix');
      if (prefix) return prefix;
    }
    return '!';
  }

  static setGuildPreset(guildID, preset) {
    return store.hsetAsync(guildID, 'preset', preset);
  }

  static async getGuildPreset(guild) {
    if (guild) {
      const preset = await store.hgetAsync(guild.id, 'preset');
      if (preset) return preset;
    }
    return 'junko';
  }

  static async saveLog(log) {
    await store.rpushAsync('bot-logs', log);
  }

  static getLastRestartDate() {
    return store.getAsync('LastRestart');
  }

  static async saveProcessExitDate() {
    store.set('LastRestart', `${moment.utc().format('DD-MM-YYYY[\n]HH:mm:ss')} UTC`);
  }

  static getTag(guildID, tagName) {
    return store.hgetAsync(`${guildID}-tags`, tagName);
  }

  static addTag(guildID, tagName, tagContent) {
    return store.hsetAsync(`${guildID}-tags`, tagName, tagContent);
  }

  static deleteTag(guildID, tagName) {
    return store.hdelAsync(`${guildID}-tags`, tagName);
  }

  static checkBlackList(userID) {
    return store.hgetAsync('blacklist', userID);
  }
};

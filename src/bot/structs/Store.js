const { cache } = require('./Database');
const Guild = require('../models/Guild');
const Blacklist = require('../models/Blacklist');
const Tag = require('../models/Tag');

module.exports = class Store {
  static async checkCache(modelName, id) {
    const cached = await cache.getAsync(`${modelName}_${id}`);
    if (cached) {
      return JSON.parse(cached);
    }
    return null;
  }

  static async saveToCache(modelName, id, data) {
    await cache.setAsync(`${modelName}_${id}`, JSON.stringify(data));
  }

  static async invalidateCache(modelName, id) {
    await cache.delAsync(`${modelName}_${id}`);
  }

  static async setGuildPrefix(guildID, prefix) {
    await Guild.upsert({ guildID, prefix });
    await this.invalidateCache('guild', guildID);
  }

  static async getGuildPrefix({ id: guildID }) {
    const cached = await this.checkCache('guild', guildID);
    if (cached && cached.prefix) {
      return cached.prefix;
    }
    const res = await Guild.findByPk(guildID);
    if (res) {
      const guildObj = res.toJSON();
      await this.saveToCache('guild', guildID, guildObj);
      if (guildObj.prefix) {
        return guildObj.prefix;
      }
    }
    return '!';
  }

  static async setGuildPreset(guildID, preset) {
    await Guild.upsert({ guildID, preset });
    await this.invalidateCache('guild', guildID);
  }

  static async getGuildPreset({ id: guildID }) {
    const cached = await this.checkCache('guild', guildID);
    if (cached && cached.preset) {
      return cached.preset;
    }
    const res = await Guild.findByPk(guildID);
    if (res) {
      const guildObj = res.toJSON();
      await this.saveToCache('guild', guildID, guildObj);
      if (guildObj.preset) {
        return guildObj.preset;
      }
    }
    return 'junko';
  }

  static async getBlacklist() {
    const cached = await this.checkCache('blacklist', '');
    if (cached) {
      return cached;
    }
    const res = await Blacklist.findAll();
    if (res.length) {
      const blacklist = res.map(val => val.toJSON().userID);
      await this.saveToCache('blacklist', '', blacklist);
      return blacklist;
    }

    return [];
  }

  static async addToBlacklist(userID) {
    await Blacklist.create({ userID });
    await this.invalidateCache('blacklist', '');
  }

  static async removeFromBlacklist(userID) {
    await Blacklist.destroy({
      where: {
        userID
      }
    });
    await this.invalidateCache('blacklist', '');
  }

  static async getTag(name) {
    const res = await Tag.findOne({ where: { name } });
    if (res) {
      return res.toJSON();
    }
    return null;
  }

  static addTag(guildID, name, content) {
    return Tag.create({ guildID, name, content });
  }

  static deleteTag(name) {
    return Tag.destroy({
      where: {
        name
      }
    });
  }
};

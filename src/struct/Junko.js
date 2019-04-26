const { Client, Collection } = require('discord.js');
const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis);

module.exports = class extends Client {
  constructor() {
    super({
      disableEveryone: true,
      disabledEvents: ['TYPING_START']
    });
    this.commands = new Collection();

    this.cooldowns = new Collection();

    this.store = redis.createClient();

    return (async () => {
      this.config = await this.store.hgetallAsync('config');
      return this;
    })();
  }
};

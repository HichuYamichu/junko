const { Client, Collection } = require('discord.js');
const redis = require('redis');
const fs = require('fs');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis);
bluebird.promisifyAll(fs);

module.exports = class extends Client {
  constructor() {
    super({
      disableEveryone: true,
      disabledEvents: ['TYPING_START'],
      partials: ['MESSAGE', 'CHANNEL', 'USER', 'GUILD_MEMBER']
    });
    this.commands = new Collection();

    this.cooldowns = new Collection();

    this.store = redis.createClient();
  }

  async start() {
    this.config = await this.store.hgetallAsync('config');

    const events = await fs.readdirAsync('./src/events/');
    for (const event of events) {
      const eventName = event.split('.')[0];
      const eventModule = require(`../events/${event}`);
      this.on(eventName, eventModule.bind(null, this));
    }

    const commandFiles = await fs.readdirAsync('./src/commands');
    for (const file of commandFiles) {
      const command = require(`../commands/${file}`);
      this.commands.set(command.name, command);
    }

    this.login(this.config.token);
  }
};

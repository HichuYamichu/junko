const { Inhibitor } = require('discord-akairo');

class BlacklistInhibitor extends Inhibitor {
  constructor() {
    super('blacklist', {
      reason: 'blacklist'
    });
  }

  async exec(message) {
    const blacklist = await this.client.store.getBlacklist();
    return blacklist.includes(message.author.id);
  }
}

module.exports = BlacklistInhibitor;

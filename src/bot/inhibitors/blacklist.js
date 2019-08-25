const { Inhibitor } = require('discord-akairo');

class BlacklistInhibitor extends Inhibitor {
  constructor() {
    super('blacklist', {
      reason: 'blacklist'
    });
  }

  async exec(message) {
    const res = await this.client.store.checkBlackList(message.author.id);
    return res;
  }
}

module.exports = BlacklistInhibitor;

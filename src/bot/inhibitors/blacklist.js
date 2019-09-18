const { Inhibitor } = require('discord-akairo');

class BlacklistInhibitor extends Inhibitor {
  constructor() {
    super('blacklist', {
      reason: 'blacklist'
    });
  }

  async exec(message) {
    const res = await this.client.store.get(message.guild, 'blacklist', []);
    const blacklist = typeof res === 'string' ? JSON.parse(res) : res;
    return blacklist.includes(message.author.id);
  }
}

module.exports = BlacklistInhibitor;

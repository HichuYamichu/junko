const { Listener } = require('discord-akairo');

class WarnListener extends Listener {
  constructor() {
    super('warn', {
      emitter: 'client',
      event: 'warn'
    });
  }

  exec(event) {
    this.client.logger.warn(event);
  }
}

module.exports = WarnListener;

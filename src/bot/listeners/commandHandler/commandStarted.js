const { Listener } = require('discord-akairo');

class CommandBlockedListener extends Listener {
  constructor() {
    super('commandStarted', {
      event: 'commandStarted',
      emitter: 'commandHandler'
    });
  }

  exec() {
    this.client.prometheus.commandCounter.inc();
  }
}

module.exports = CommandBlockedListener;

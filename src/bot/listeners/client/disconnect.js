const { Listener } = require('discord-akairo');

class DisconnectListener extends Listener {
  constructor() {
    super('disconnect', {
      emitter: 'client',
      event: 'disconnect'
    });
  }

  exec() {
    this.client.logger.info('Disconnected...');
  }
}

module.exports = DisconnectListener;

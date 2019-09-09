const { Listener } = require('discord-akairo');

class ErrorListener extends Listener {
  constructor() {
    super('clientError', {
      emitter: 'client',
      event: 'error'
    });
  }

  exec(event) {
    this.client.logger.error(event);
  }
}

module.exports = ErrorListener;

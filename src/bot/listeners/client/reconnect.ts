import { Listener } from 'discord-akairo';

export default class ReconnectListener extends Listener {
  constructor() {
    super('reconnect', {
      emitter: 'client',
      event: 'reconnect'
    });
  }

  exec() {
    this.client.logger.info('Reconnecting...');
  }
}

module.exports = ReconnectListener;

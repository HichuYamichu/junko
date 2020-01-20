import { Listener } from 'discord-akairo';

export default class ReconnectListener extends Listener {
  public constructor() {
    super('reconnect', {
      emitter: 'client',
      event: 'reconnect'
    });
  }

  public exec() {
    this.client.logger.info('Reconnecting...');
  }
}

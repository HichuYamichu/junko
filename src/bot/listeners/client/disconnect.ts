import { Listener } from 'discord-akairo';

export default class DisconnectListener extends Listener {
  public constructor() {
    super('disconnect', {
      emitter: 'client',
      event: 'disconnect'
    });
  }

  public exec() {
    this.client.logger.info('Disconnected...');
  }
}

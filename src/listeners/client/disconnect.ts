import { Listener } from 'discord-akairo';
import { Logger } from '../../structs/Logger';

export default class DisconnectListener extends Listener {
  public constructor() {
    super('disconnect', {
      emitter: 'client',
      event: 'disconnect'
    });
  }

  public exec(): void {
    Logger.info('Disconnected...');
  }
}

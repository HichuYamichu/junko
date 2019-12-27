import { Listener } from 'discord-akairo';
import Logger from '../../structs/Logger';

export default class WarnListener extends Listener {
  public constructor() {
    super('warn', {
      emitter: 'client',
      event: 'warn'
    });
  }

  public exec(event: any) {
    Logger.warn(event);
  }
}

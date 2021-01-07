import { Listener } from 'discord-akairo';
import { Logger } from '../../structs/Logger';

export default class ErrorListener extends Listener {
  public constructor() {
    super('clientError', {
      emitter: 'client',
      event: 'error'
    });
  }

  public exec(event: any) {
    Logger.error(event);
  }
}

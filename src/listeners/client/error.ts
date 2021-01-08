/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Listener } from 'discord-akairo';
import { Logger } from '../../structs/Logger';

export default class ErrorListener extends Listener {
  public constructor() {
    super('clientError', {
      emitter: 'client',
      event: 'error'
    });
  }

  public exec(event: any): void {
    Logger.error(event);
  }
}

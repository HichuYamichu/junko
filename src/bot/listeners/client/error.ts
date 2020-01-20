import { Listener } from 'discord-akairo';

export default class ErrorListener extends Listener {
  public constructor() {
    super('clientError', {
      emitter: 'client',
      event: 'error'
    });
  }

  public exec(event: any) {
    this.client.logger.error(event);
  }
}

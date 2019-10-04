import { Listener } from 'discord-akairo';

export default class ErrorListener extends Listener {
  constructor() {
    super('clientError', {
      emitter: 'client',
      event: 'error'
    });
  }

  exec(event: any) {
    this.client.logger.error(event);
  }
}

module.exports = ErrorListener;

import { Listener } from 'discord-akairo';

export default class WarnListener extends Listener {
  constructor() {
    super('warn', {
      emitter: 'client',
      event: 'warn'
    });
  }

  exec(event: any) {
    this.client.logger.warn(event);
  }
}

module.exports = WarnListener;

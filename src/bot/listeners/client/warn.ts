import { Listener } from 'discord-akairo';

export default class WarnListener extends Listener {
  public constructor() {
    super('warn', {
      emitter: 'client',
      event: 'warn'
    });
  }

  public exec(event: any) {
    this.client.logger.warn(event);
  }
}

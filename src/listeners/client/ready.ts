import { Listener } from 'discord-akairo';
import { Logger } from '../../structs/Logger';

export default class ReadyListener extends Listener {
  public constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready'
    });
  }

  public exec(): void {
    this.client.user.setPresence({ activity: { name: '🌙' }, status: 'online' });
    const log = `Ready on ${this.client.guilds.cache.size} servers.`;
    Logger.info(log);
  }
}

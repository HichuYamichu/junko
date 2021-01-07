import { Listener } from 'discord-akairo';
import { Logger } from '../../structs/Logger';

export default class ReadyListener extends Listener {
  public constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready'
    });
  }

  public exec() {
    this.client.user.setPresence({ activity: { name: '🌙' }, status: 'online' });
    // eslint-disable-next-line max-len
    const log = `Ready in ${this.client.channels.cache.size} channels on ${this.client.guilds.cache.size} servers, for a total of ${this.client.users.cache.size} users.`;
    Logger.info(log);
  }
}

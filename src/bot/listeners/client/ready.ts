import { Listener } from 'discord-akairo';

export default class ReadyListener extends Listener {
  public constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready'
    });
  }

  public exec() {
    this.client.user!.setPresence({ activity: { name: '🌙' }, status: 'online' });
    // eslint-disable-next-line max-len
    const log = `Ready in ${this.client.channels.size} channels on ${this.client.guilds.size} servers, for a total of ${this.client.users.size} users.`;
    this.client.logger.info(log);
  }
}

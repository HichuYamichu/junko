import { Guild } from 'discord.js';
import { Listener } from 'discord-akairo';

export default class GuildDeleteListener extends Listener {
  constructor() {
    super('guildDelete', {
      emitter: 'client',
      event: 'guildDelete'
    });
  }

  async exec(guild: Guild) {
    await this.client.settings.clear(guild.id);
    this.client.logger.info(`Guild ${guild.name} {${guild.id}} has been deleted.`);
  }
}

module.exports = GuildDeleteListener;

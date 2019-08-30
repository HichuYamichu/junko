const { Listener } = require('discord-akairo');

class ReadyListener extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready'
    });
  }

  exec() {
    const statuses = ['🌙', '🌙🌙', '🌙🌙🌙'];
    this.client.setInterval(() => {
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      this.client.user.setPresence({ activity: { name: status }, status: 'online' });
    }, 10000);

    this.client.logger.info(
      `Ready in ${this.client.channels.size} channels on ${
        this.client.guilds.size
      } servers, for a total of ${this.client.users.size} users.`
    );
  }
}

module.exports = ReadyListener;

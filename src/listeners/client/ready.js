const { Listener } = require('discord-akairo');

class ReadyListener extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready'
    });
  }

  exec() {
    console.log(
      `Ready in ${this.client.channels.size} channels on ${
        this.client.guilds.size
      } servers, for a total of ${this.client.users.size} users.`
    );
  }
}

module.exports = ReadyListener;

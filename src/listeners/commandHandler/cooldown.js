const { Listener } = require('discord-akairo');

class CooldownListener extends Listener {
  constructor() {
    super('cooldown', {
      event: 'cooldown',
      emitter: 'commandHandler'
    });
  }

  exec(message, command, remaining) {
    const time = remaining / 1000;

    if (message.guild ? message.channel.permissionsFor(this.client.user).has('SEND_MESSAGES') : true) {
      message.reply(`${this.client.replies.get('cooldown')} You have to wait ${time.toFixed(1)} seconds.`);
    }
  }
}

module.exports = CooldownListener;

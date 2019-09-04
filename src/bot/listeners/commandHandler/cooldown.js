const { Listener } = require('discord-akairo');

class CooldownListener extends Listener {
  constructor() {
    super('cooldown', {
      event: 'cooldown',
      emitter: 'commandHandler'
    });
  }

  async exec(message, command, remaining) {
    const time = remaining / 1000;

    if (
      message.guild ? message.channel.permissionsFor(this.client.user).has('SEND_MESSAGES') : true
    ) {
      const reply = await this.client.getReply(
        message,
        'cooldown',
        ` You have to wait ${time.toFixed(1)} seconds.`
      );
      return message.util.send(reply);
    }
  }
}

module.exports = CooldownListener;

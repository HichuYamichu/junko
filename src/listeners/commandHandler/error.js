const { Listener } = require('discord-akairo');

class ErrorListener extends Listener {
  constructor() {
    super('error', {
      emitter: 'commandHandler',
      event: 'error'
    });
  }

  exec(err, message) {
    console.error(err);
    if (message.guild && !message.channel.permissionsFor(this.client.user).has('SEND_MESSAGES')) {
      return null;
    }
    return message.util.reply('there was an error trying to execute that command!');
  }
}

module.exports = ErrorListener;

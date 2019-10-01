const { Command } = require('discord-akairo');

class NotEnabled extends Command {
  constructor() {
    super('not-enabled', {
      category: 'info'
    });
  }

  async exec(message) {
    return message.util.send('Requested functionality not enabled!');
  }
}
module.exports = NotEnabled;

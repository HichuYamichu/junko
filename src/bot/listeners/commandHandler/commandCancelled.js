const { Listener } = require('discord-akairo');

class CommandCancelledListener extends Listener {
  constructor() {
    super('commandCancelled', {
      emitter: 'commandHandler',
      event: 'commandCancelled'
    });
  }

  exec(message, command) {
    const channel = message.guild ? `${message.guild.name} {${message.guild.id}}` : 'DM';
    const log = `Cancelled ${command.id} on ${channel}`;
    this.client.logger.info(log);
  }
}

module.exports = CommandCancelledListener;

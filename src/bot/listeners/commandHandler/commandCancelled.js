const { Listener } = require('discord-akairo');

class CommandCancelledListener extends Listener {
  constructor() {
    super('commandCancelled', {
      emitter: 'commandHandler',
      event: 'commandCancelled'
    });
  }

  exec(message, command) {
    const channel = message.guild
      ? `Guild: ${message.guild.name} (${message.guild.id})`
      : `DM: ${message.author.tag} (${message.author.id})`;
    const log = `Cancelled ${command.id} on ${channel}`;
    this.client.logger.info(log);
  }
}

module.exports = CommandCancelledListener;

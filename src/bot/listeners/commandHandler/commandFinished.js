const { Listener } = require('discord-akairo');

class CommandCancelledListener extends Listener {
  constructor() {
    super('commandFinished', {
      emitter: 'commandHandler',
      event: 'commandFinished'
    });
  }

  exec(message, command, args) {
    const channel = message.guild
      ? `Guild: ${message.guild.name} (${message.guild.id})`
      : `DM: ${message.author.tag} (${message.author.id})`;
    const cmdArgs = Object.keys(args).length && !args.command ? `Args: ${JSON.stringify(args)}` : '';
    const log = `Finished  ${command.id} on ${channel} ${cmdArgs}`;
    this.client.logger.info(log);
  }
}

module.exports = CommandCancelledListener;

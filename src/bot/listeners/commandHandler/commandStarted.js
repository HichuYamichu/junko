const { Listener } = require('discord-akairo');

class CommandBlockedListener extends Listener {
  constructor() {
    super('commandStarted', {
      event: 'commandStarted',
      emitter: 'commandHandler'
    });
  }

  exec(message, command, args) {
    const channel = message.guild
      ? `Guild: ${message.guild.name} (${message.guild.id})`
      : `DM: ${message.author.tag} (${message.author.id})`;
    const cmdArgs = Object.keys(args).length && !args.command ? `Args: ${JSON.stringify(args)}` : '';
    const log = `Started ${command.id} on ${channel} ${cmdArgs}`;
    this.client.logger.info(log);
    this.client.prometheus.commandCounter.inc();
  }
}

module.exports = CommandBlockedListener;

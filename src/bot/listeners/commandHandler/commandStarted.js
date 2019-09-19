const { Listener } = require('discord-akairo');
const { inspect } = require('util');

class CommandBlockedListener extends Listener {
  constructor() {
    super('commandStarted', {
      event: 'commandStarted',
      emitter: 'commandHandler'
    });
  }

  clean(item) {
    if (typeof item === 'string') return item;
    const cleaned = inspect(item);
    return cleaned;
  }

  exec(message, command, args) {
    const channel = message.guild
      ? `Guild: ${message.guild.name} (${message.guild.id})`
      : `DM: ${message.author.tag} (${message.author.id})`;
    const cmdArgs = Object.keys(args).length && !args.command ? `Args: ${this.clean(args)}` : '';
    const log = `Started ${command.id} on ${channel} ${cmdArgs}`;
    this.client.logger.info(log);
    this.client.prometheus.metrics.commandCounter.inc();
  }
}

module.exports = CommandBlockedListener;

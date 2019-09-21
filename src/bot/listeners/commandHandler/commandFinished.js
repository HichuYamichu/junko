const { Listener } = require('discord-akairo');
const { inspect } = require('util');

class CommandCancelledListener extends Listener {
  constructor() {
    super('commandFinished', {
      emitter: 'commandHandler',
      event: 'commandFinished'
    });
  }

  clean(item) {
    if (typeof item === 'string') return item;
    const cleaned = inspect(item, { depth: 1 });
    return cleaned;
  }

  exec(message, command, args) {
    const channel = message.guild
      ? `Guild: ${message.guild.name} (${message.guild.id})`
      : `DM: ${message.author.tag} (${message.author.id})`;
    const cmdArgs = Object.keys(args).length && !args.command ? `Args: ${this.clean(args)}` : '';
    const log = `Finished  ${command.id} on ${channel} ${cmdArgs}`;
    this.client.logger.info(log);
  }
}

module.exports = CommandCancelledListener;

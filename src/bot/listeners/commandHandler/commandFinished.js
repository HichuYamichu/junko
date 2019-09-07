const { Listener } = require('discord-akairo');

class CommandCancelledListener extends Listener {
  constructor() {
    super('commandFinished', {
      emitter: 'commandHandler',
      event: 'commandFinished'
    });
  }

  exec(message, command, args) {
    const channel = message.guild ? `${message.guild.name} {${message.guild.id}}` : 'DM';
    const cmdArgs = Object.keys(args).length && !args.command ? `args: ${JSON.stringify(args)}` : '';
    const log = `Finished  ${command.id} on ${channel} ${cmdArgs}`;
    this.client.logger.info(log);
  }
}

module.exports = CommandCancelledListener;

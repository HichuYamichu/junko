const { Listener } = require('discord-akairo');

class MessageInvalidListener extends Listener {
  constructor() {
    super('messageInvalid', {
      emitter: 'commandHandler',
      event: 'messageInvalid'
    });
  }

  async exec(message) {
    if (
      message.util.parsed.command ||
      !message.guild ||
      !message.util.parsed.prefix ||
      !message.util.parsed.alias ||
      !message.util.parsed.afterPrefix
    ) { return; }
    const command = this.client.commandHandler.modules.get('tag-get');
    const args = await command.parse(message, message.util.parsed.afterPrefix);
    return this.client.commandHandler.runCommand(message, command, args);
  }
}

module.exports = MessageInvalidListener;

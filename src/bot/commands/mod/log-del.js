const { Command } = require('discord-akairo');

class LogDelCommand extends Command {
  constructor() {
    super('log-del', {
      aliases: ['log-del'],
      category: 'mod',
      ownerOnly: false,
      channel: 'guild',
      description: {
        content: 'Disables a log channel.',
        usage: '',
        examples: []
      },
      userPermissions: ['MANAGE_GUILD']
    });
  }

  async exec(message) {
    await message.client.store.del(message.guild.id, 'logChannel');
    return message.util.send('Log channel disabled.');
  }
}

module.exports = LogDelCommand;

const { Command } = require('discord-akairo');

class LogSetCommand extends Command {
  constructor() {
    super('log-message', {
      category: 'mod',
      ownerOnly: false,
      channel: 'guild',
      description: {
        content: 'Sets up a message log channel.',
        usage: '<channel>',
        examples: ['#logs', '506150345391603724']
      },
      args: [
        {
          id: 'chan',
          type: 'channel'
        }
      ],
      userPermissions: ['MANAGE_GUILD']
    });
  }

  async exec(message, { chan }) {
    if (chan) {
      await message.client.store.set(message.guild.id, 'messageLog', chan.id);
      return message.util.send(`Message log enabled in ${chan}!`);
    }
    await message.client.store.del(message.guild.id, 'messageLog');
    return message.util.send('Message log disabled.');
  }
}

module.exports = LogSetCommand;

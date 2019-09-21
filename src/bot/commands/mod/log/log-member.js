const { Command } = require('discord-akairo');

class LogSetCommand extends Command {
  constructor() {
    super('log-member', {
      category: 'mod',
      ownerOnly: false,
      channel: 'guild',
      description: {
        content: 'Sets up a member log channel.',
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
      await message.client.store.set(message.guild.id, 'memberLog', chan.id);
      return message.util.send(`Member log enabled in ${chan}!`);
    }
    await message.client.store.del(message.guild.id, 'memberLog');
    return message.util.send('Member log disabled.');
  }
}

module.exports = LogSetCommand;

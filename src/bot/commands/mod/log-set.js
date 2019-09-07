const { Command } = require('discord-akairo');

class LogSetCommand extends Command {
  constructor() {
    super('log-set', {
      aliases: ['log-set'],
      category: 'mod',
      ownerOnly: false,
      channel: 'guild',
      description: {
        content: 'Sets up a log channel.',
        usage: '<channel>',
        examples: ['#logs', '506150345391603724']
      },
      args: [
        {
          id: 'chan',
          type: 'channel',
          prompt: {
            start: message => `${message.author}, provide a channel.`,
            retry: message => `${message.author}, seems like an invalid channel.`
          }
        }
      ],
      userPermissions: ['MANAGE_GUILD']
    });
  }

  async exec(message, { chan }) {
    await message.client.store.setModChannel(message.guild.id, chan.id);
    return message.util.send(`Log channel has been set to ${chan}`);
  }
}

module.exports = LogSetCommand;

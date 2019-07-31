const { Command } = require('discord-akairo');

class PrefixCommand extends Command {
  constructor() {
    super('prefix', {
      aliases: ['prefix'],
      ownerOnly: false,
      channel: 'guild',
      args: [
        {
          id: 'text',
          type: 'string'
        }
      ],
      userPermissions: ['ADMINISTRATOR']
    });
  }

  async exec(message, { prefix }) {
    await message.client.store.hsetAsync(message.guild.id, 'prefix', prefix);
    message.channel.send(`My prefix is now \`${prefix}\``);
  }
}

module.exports = PrefixCommand;

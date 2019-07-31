const { Command, Argument } = require('discord-akairo');

class PrefixCommand extends Command {
  constructor() {
    super('prefix', {
      aliases: ['prefix'],
      ownerOnly: false,
      channel: 'guild',
      args: [
        {
          id: 'prefix',
          match: 'content',
          type: Argument.validate('string', (m, p) => !/\s/.test(p) && p.length <= 10),
          prompt: {
            start: message => `${message.author}, provide a prefix you would like to use.`,
            retry: message => `${message.author}, prefix must not contain spaces and be less then 10 characters.`
          }
        }
      ],
      userPermissions: ['MANAGE_GUILD']
    });
  }

  async exec(message, { prefix }) {
    await message.client.store.hsetAsync(message.guild.id, 'prefix', prefix);
    message.channel.send(`My prefix is now \`${prefix}\``);
  }
}

module.exports = PrefixCommand;

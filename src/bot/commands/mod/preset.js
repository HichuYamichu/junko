const { Command } = require('discord-akairo');

class PresetCommand extends Command {
  constructor() {
    super('preset', {
      aliases: ['preset', 'setpreset', 'ser-preset'],
      category: 'mod',
      ownerOnly: false,
      channel: 'guild',
      description: {
        content: 'Sets replies preset for this server.',
        usage: '<preset-name>',
        examples: ['junko (default)', 'mean', 'tsun', 'oneesan']
      },
      args: [
        {
          id: 'preset',
          type: ['junko', 'mean', 'tsun', 'oneesan'],
          prompt: {
            start: 'Provide a preset name.',
            retry: 'you have to choose from available presets.'
          }
        }
      ],
      userPermissions: ['MANAGE_GUILD']
    });
  }

  async exec(message, { preset }) {
    await message.client.store.set(message.guild.id, 'preset', preset);
    return message.util.send(`Changed preset to \`${preset}\``);
  }
}

module.exports = PresetCommand;

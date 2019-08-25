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
            start: message => `${message.author}, provide a preset name.`,
            retry: message =>
              `${message.author}, you have to choose from available presets.`
          }
        }
      ],
      userPermissions: ['MANAGE_GUILD']
    });
  }

  async exec(message, { preset }) {
    await message.client.store.setGuildPreset(message.guild.id, preset);
    return message.util.send(`Changed preset to \`${preset}\``);
  }
}

module.exports = PresetCommand;

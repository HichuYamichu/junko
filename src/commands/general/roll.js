const { Command } = require('discord-akairo');
const { join } = require('path');

class RollCommand extends Command {
  constructor() {
    super('roll', {
      aliases: ['roll', 'dice'],
      ownerOnly: false,
      channel: 'guild',
      args: [
        {
          'id': 'threshold',
          'type': 'number',
          'default': 6
        }
      ],
      clientPermissions: ['MANAGE_WEBHOOKS']
    });
  }

  async exec(message, { threshold }) {
    const webhook = await message.channel.createWebhook('Dice', {
      avatar: join(__dirname, '../../..', 'static/dice.jpg')
    });
    const roll = await Math.floor((Math.random() * threshold) + 1);
    await webhook.send({
      username: 'DICE',
      embeds: [
        {
          title: 'You rolled:',
          color: 16722763,
          description: `**${roll}**`
        }
      ]
    });
    await webhook.delete();
  }
}

module.exports = RollCommand;

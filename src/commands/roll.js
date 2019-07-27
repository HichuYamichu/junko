module.exports = {
  name: 'roll',
  description: 'Rolles a dice for you.',
  args: 0,
  usage: '<range>',
  examples: ['roll 6', 'roll 20'],
  guildOnly: true,
  cooldown: 1,
  aliases: [],
  permissionLVL: 0,
  async execute(message, args) {
    const webhook = await message.channel.createWebhook('Dice', {
      avatar: './static/dice.jpg'
    });
    const range = args[0] || 6;
    const roll = await Math.floor((Math.random() * range) + 1);
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
};

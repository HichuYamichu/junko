module.exports = {
  name: 'roll',
  description: 'Rolles a dice for you.',
  args: false,
  usage: '<user> <role>',
  guildOnly: true,
  cooldown: 1,
  permissionLVL: 0,
  async execute(message, args) {
    const webhook = await message.channel.createWebhook('Dice', {
      avatar: './src/static/dice.jpg'
    });
    const roll = await Math.floor(Math.random() * 6 + 1);
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

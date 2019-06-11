const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'stats',
  description: 'Displayes process stats',
  args: 0,
  usage: '<nil>',
  guildOnly: false,
  cooldown: 1,
  aliases: [],
  permissionLVL: 1,
  async execute(message, args) {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    const uptime = process.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime - (days * 86400)) / 3600);
    const minutes = Math.floor((uptime - (hours * 3600)) / 60);
    const seconds = Math.floor(uptime - (hours * 3600) - (minutes * 60));
    const lastRS = await message.client.store.hgetAsync('config', 'lastRestart');

    const embed = new MessageEmbed()
      .setTitle('**Stats:**')
      .setColor('#fc2041')
      .addField('Memory usage:', `${Math.round(used * 100) / 100} MB`)
      .addField('Uptime:', `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`)
      .addField('Last restart:', lastRS);

    message.channel.send(embed);
  }
};

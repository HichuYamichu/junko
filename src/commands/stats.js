const { MessageEmbed } = require('discord.js');
const { version } = require('../../package.json');

module.exports = {
  name: 'stats',
  description: 'Displayes process stats',
  args: 0,
  usage: '',
  guildOnly: false,
  cooldown: 1,
  aliases: [],
  permissionLVL: 1,
  async execute(message, args) {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    const uptime = process.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime - days * 86400) / 3600);
    const minutes = Math.floor((uptime - hours * 3600) / 60);
    const seconds = Math.floor(uptime - hours * 3600 - minutes * 60);
    const lastRS = await message.client.store.hgetAsync('JunkoConf', 'lastRestart');
    const author = `${message.client.users.get(message.client.config.ownerID).tag}`;
    const guildsCount = message.client.guilds.size;
    const channelsCount = message.client.channels.size;
    const usersCount = message.client.users.size;

    const embed = new MessageEmbed()
      .setTitle('**Stats:**')
      .setColor('#fc2041')
      .addField('Memory usage:', `${Math.round(used * 100) / 100} MB`, true)
      .addField('Uptime:', `${days}d ${hours}h ${minutes}m ${seconds}s`, true)
      .addField('Last restart:', lastRS, true)
      .addField(
        'General:',
        `Guilds: ${guildsCount}
        Channels: ${channelsCount}
      Users: ${usersCount}
      `,
        true
      )
      .addField('Version:', `v${version}`, true)
      .addField('Sauce:', `[GitHub](https://github.com/HichuYamichu/Junko)`, true)
      .setThumbnail(message.client.user.displayAvatarURL())
      .setFooter(`Coded with ❤ by ${author}`);

    message.channel.send(embed);
  }
};

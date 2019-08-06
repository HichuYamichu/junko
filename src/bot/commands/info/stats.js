const { Command } = require('discord-akairo');
const { version } = require('../../package.json');
const { stripIndents } = require('common-tags');

class StatsCommand extends Command {
  constructor() {
    super('stats', {
      aliases: ['stats'],
      category: 'info',
      ownerOnly: false,
      channel: ['guild', 'dm'],
      description: {
        content: 'Sends my private info.',
        usage: '',
        examples: ['']
      },
      clientPermissions: ['EMBED_LINKS']
    });
  }

  async exec(message, args) {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    const uptime = process.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime - days * 86400) / 3600);
    const minutes = Math.floor((uptime - hours * 3600) / 60);
    const seconds = Math.floor(uptime - hours * 3600 - minutes * 60);
    const lastRS = await message.client.store.getAsync('LastRestart');
    const author = `${message.client.users.get(message.client.config.ownerID).tag}`;
    const guildsCount = message.client.guilds.size;
    const channelsCount = message.client.channels.size;
    const usersCount = message.client.users.size;

    const embed = this.client.util.embed()
      .setTitle('**Stats:**')
      .setColor(this.client.color)
      .addField('Memory usage:', `${Math.round(used * 100) / 100} MB`, true)
      .addField('Uptime:', `${days}d ${hours}h ${minutes}m ${seconds}s`, true)
      .addField(
        'General:',
        stripIndents`
        Guilds: ${guildsCount}
        Channels: ${channelsCount}
        Users: ${usersCount}
        `,
        true
      )
      .addField('Last restart:', lastRS, true)
      .addField('Version:', `v${version}`, true)
      .addField('Sauce:', `[GitHub](https://github.com/HichuYamichu/Junko)`, true)
      .setThumbnail(message.client.user.displayAvatarURL())
      .setFooter(`Coded with ❤ by ${author}`);

    return message.util.send(embed);
  }
}

module.exports = StatsCommand;

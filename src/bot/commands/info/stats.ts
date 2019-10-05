import { Message } from 'discord.js';
import { Command } from 'discord-akairo';
import { version } from '../../package.json';
import { stripIndents } from 'common-tags';
import * as moment from 'moment';
import 'moment-duration-format';

export default class StatsCommand extends Command {
  public constructor() {
    super('stats', {
      aliases: ['stats'],
      category: 'info',
      ownerOnly: false,
      description: {
        content: 'Sends my private info.',
        usage: '',
        examples: ['']
      },
      clientPermissions: ['EMBED_LINKS']
    });
  }

  public async exec(message: Message) {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    const lastRestart = Date.now() - Math.floor(this.client.uptime!) * 1000;
    const author = `${message.client.users.get(this.client.config.ownerID)!.tag}`;
    const guildsCount = message.client.guilds.size;
    const channelsCount = message.client.channels.size;
    const usersCount = message.client.users.size;

    const embed = this.client.util
      .embed()
      .setTitle('**Stats:**')
      .setColor(this.client.config.color)
      .addField('Memory usage:', `${Math.round(used * 100) / 100} MB`, true)
      .addField('Uptime:', moment.duration(this.client.uptime!).format('d[d ]h[h ]m[m ]s[s]'), true)
      .addField(
        'General:',
        stripIndents`
        Guilds: ${guildsCount}
        Channels: ${channelsCount}
        Users: ${usersCount}
        `,
        true
      )
      .addField(
        'Last restart:',
        `${moment.utc(lastRestart).format('DD-MM-YYYY[\n]HH:mm:ss')} UTC`,
        true
      )
      .addField('Version:', `v${version}`, true)
      .addField('Sauce:', `[GitHub](https://github.com/HichuYamichu/Junko)`, true)
      .setThumbnail(message.client.user!.displayAvatarURL())
      .setFooter(`Coded with ❤ by ${author}`);

    return message.util!.send(embed);
  }
}

module.exports = StatsCommand;

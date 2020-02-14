import { TextChannel, GuildMember } from 'discord.js';
import { Listener } from 'discord-akairo';
import * as moment from 'moment';
import 'moment-duration-format';

export default class GuildMemberRemoveListener extends Listener {
  public constructor() {
    super('guildMemberRemove', {
      emitter: 'client',
      event: 'guildMemberRemove'
    });
  }

  public async exec(member: GuildMember) {
    if (!member.guild.me!.hasPermission('EMBED_LINKS')) return;
    const memberLog = await this.client.settings.get(member.guild, 'memberLog', '');
    if (!memberLog) return;
    const memberLogChannel = this.client.channels.cache.get(memberLog);
    if (!memberLogChannel) return;
    const embed = this.client.util
      .embed()
      .setAuthor(`${member.user.tag} (${member.user.id})`, member.user.displayAvatarURL())
      .setColor(this.client.config.color)
      .setDescription(
        `**Left after:** ${moment
          .duration(Date.now() - member.joinedTimestamp!)
          .format('d[d ]h[h ]m[m ]s[s]')}`
      )
      .setFooter('Left')
      .setTimestamp(Date.now());
    return (memberLogChannel as TextChannel).send(embed);
  }
}

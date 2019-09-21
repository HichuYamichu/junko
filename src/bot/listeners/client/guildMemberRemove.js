const { Listener } = require('discord-akairo');
const moment = require('moment-timezone');
const momentDurationFormatSetup = require('moment-duration-format');
momentDurationFormatSetup(moment);

class GuildMemberRemoveListener extends Listener {
  constructor() {
    super('guildMemberRemove', {
      emitter: 'client',
      event: 'guildMemberRemove'
    });
  }

  async exec(member) {
    if (!member.guild.me.hasPermission('EMBED_LINKS')) return;
    const memberLog = await this.client.store.get(member.guild, 'memberLog', null);
    if (!memberLog) return;
    const memberLogChannel = this.client.channels.get(memberLog);
    if (!memberLogChannel) return;
    const embed = this.client.util
      .embed()
      .setAuthor(`${member.user.tag} (${member.user.id})`, member.user.displayAvatarURL())
      .setColor(this.client.config.color)
      .setDescription(
        `**Left after:** ${moment
          .duration(Date.now() - member.joinedTimestamp)
          .format('d[d ]h[h ]m[m ]s[s]')}`
      )
      .setFooter('Left')
      .setTimestamp(Date.now());
    return memberLogChannel.send(embed);
  }
}

module.exports = GuildMemberRemoveListener;

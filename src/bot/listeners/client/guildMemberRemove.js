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
    const modLogID = await this.client.store.getModChannel(member.guild, null);
    if (!modLogID) return;
    const modChannel = this.client.channels.get(modLogID);
    if (!modChannel) return;
    const embed = this.client.util
      .embed()
      .setThumbnail(member.user.displayAvatarURL())
      .setColor(this.client.config.color)
      .setTitle('Member left the guild.')
      .addField('**Tag:**', member.user.tag, true)
      .addField(
        '**Left after:**',
        moment.duration(Date.now() - member.joinedTimestamp).format('d[d ]h[h ]m[m ]s[s]'),
        true
      );
    return modChannel.send(embed);
  }
}

module.exports = GuildMemberRemoveListener;

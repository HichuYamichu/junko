const { Listener } = require('discord-akairo');

class GuildMemberAddListener extends Listener {
  constructor() {
    super('guildMemberAdd', {
      emitter: 'client',
      event: 'guildMemberAdd'
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
      .setTitle('Member joined the guild.')
      .addField('**Tag:**', member.user.tag);
    return modChannel.send(embed);
  }
}

module.exports = GuildMemberAddListener;

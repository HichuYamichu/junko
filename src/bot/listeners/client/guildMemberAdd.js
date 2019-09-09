const { Listener } = require('discord-akairo');

class GuildMemberAddListener extends Listener {
  constructor() {
    super('guildMemberAdd', {
      emitter: 'client',
      event: 'guildMemberAdd'
    });
  }

  async exec(member) {
    if (!member.guild.me.hasPermission('EMBED_LINKS')) return;
    const modLogID = await this.client.store.get(member.guild.id, 'logChannel', null);
    if (!modLogID) return;
    const modChannel = this.client.channels.get(modLogID);
    if (!modChannel) return;
    const embed = this.client.util
      .embed()
      .setAuthor(`${member.user.tag} (${member.user.id})`, member.user.displayAvatarURL())
      .setColor(this.client.config.color)
      .setFooter('Joined')
      .setTimestamp(member.joinedTimestamp);
    return modChannel.send(embed);
  }
}

module.exports = GuildMemberAddListener;

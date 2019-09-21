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
    const memberLog = await this.client.store.get(member.guild, 'memberLog', null);
    if (!memberLog) return;
    const memberLogChannel = this.client.channels.get(memberLog);
    if (!memberLogChannel) return;
    const embed = this.client.util
      .embed()
      .setAuthor(`${member.user.tag} (${member.user.id})`, member.user.displayAvatarURL())
      .setColor(this.client.config.color)
      .setFooter('Joined')
      .setTimestamp(member.joinedTimestamp);
    return memberLogChannel.send(embed);
  }
}

module.exports = GuildMemberAddListener;

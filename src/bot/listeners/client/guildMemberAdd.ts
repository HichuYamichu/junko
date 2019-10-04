import { GuildMember, TextChannel } from 'discord.js';
import { Listener } from 'discord-akairo';

export default class GuildMemberAddListener extends Listener {
  constructor() {
    super('guildMemberAdd', {
      emitter: 'client',
      event: 'guildMemberAdd'
    });
  }

  async exec(member: GuildMember) {
    if (!member.guild.me!.hasPermission('EMBED_LINKS')) return;
    const memberLog = await this.client.settings.get(member.guild, 'memberLog', null);
    if (!memberLog) return;
    const memberLogChannel = this.client.channels.get(memberLog);
    if (!memberLogChannel) return;
    const embed = this.client.util
      .embed()
      .setAuthor(`${member.user.tag} (${member.user.id})`, member.user.displayAvatarURL())
      .setColor(this.client.config.color)
      .setFooter('Joined')
      .setTimestamp(member.joinedTimestamp!);
    return (memberLogChannel as TextChannel).send(embed);
  }
}

module.exports = GuildMemberAddListener;

const { Command } = require('discord-akairo');
const moment = require('moment');
const { stripIndents } = require('common-tags');

class ChannelInfoCommand extends Command {
  constructor() {
    super('channel-info', {
      aliases: ['channel-info', 'channel'],
      category: 'info',
      ownerOnly: false,
      channel: 'guild',
      description: {
        content: 'Sends info about current channel.',
        usage: '',
        examples: ['']
      },
      clientPermissions: ['EMBED_LINKS']
    });
  }

  async exec(message, args) {
    const embed = this.client.util.embed();
    embed
      .setColor(this.client.color)
      .setDescription(`Info about **${message.channel.name}** (ID: ${message.channel.id})`)
      .addField(
        'Info:',
        stripIndents`
				• Type: ${message.channel.type}
				• Topic ${message.channel.topic ? message.channel.topic : 'None'}
				• NSFW: ${Boolean(message.channel.nsfw)}
				• Creation Date: ${moment.utc(message.channel.createdAt).format('YYYY/MM/DD hh:mm:ss')}
			`
      )
      .setThumbnail(message.guild.iconURL());
    return message.util.send(embed);
  }
}

module.exports = ChannelInfoCommand;

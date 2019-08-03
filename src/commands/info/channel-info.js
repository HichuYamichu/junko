const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

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
    const embed = new MessageEmbed();
    embed
      .setColor('#fc2041')
      .setDescription(`Info about **${message.channel.name}** (ID: ${message.channel.id})`)
      .addField(
        'Info:',
        `
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

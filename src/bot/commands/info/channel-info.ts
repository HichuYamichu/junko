import { Message, TextChannel } from 'discord.js';
import { Command } from 'discord-akairo';
import moment from 'moment';
import { stripIndents } from 'common-tags';

export default class ChannelInfoCommand extends Command {
  public constructor() {
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
      args: [
        {
          id: 'channel',
          match: 'content',
          type: 'channel',
          default: (message: Message) => message.channel
        }
      ],
      clientPermissions: ['EMBED_LINKS']
    });
  }

  public async exec(message: Message, { channel }: { channel: TextChannel }) {
    const embed = this.client.util.embed();
    embed
      .setColor(this.client.config.color)
      .setDescription(`Info about **${channel.name}** (ID: ${channel.id})`)
      .addField(
        'Info:',
        stripIndents`
				• Type: ${channel.type}
				• Topic ${channel.topic ? channel.topic : 'None'}
				• NSFW: ${Boolean(channel.nsfw)}
				• Creation Date: ${moment.utc(message.channel.createdAt).format('YYYY/MM/DD hh:mm:ss')}
			`
      )
      .setThumbnail(message.guild!.iconURL()!);
    return message.util!.send(embed);
  }
}

module.exports = ChannelInfoCommand;

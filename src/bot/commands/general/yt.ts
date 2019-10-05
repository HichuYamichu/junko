import { Command, Argument, Flag } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';

export default class YTCommand extends Command {
  public constructor() {
    super('yt', {
      aliases: ['yt'],
      category: 'general',
      ownerOnly: false,
      description: {
        content: 'Searches YouTube.',
        usage: '<query>',
        examples: ['jpegmafia']
      }
    });
  }

  public async *args(message: Message) {
    if (!this.client.APIManager.yt) return Flag.continue('not-enabled');

    const query = yield {
      match: 'content',
      prompt: {
        start: 'Input your search query.',
        retry: 'You have to provide valid search query.'
      }
    };

    const res = await this.client.APIManager.yt.searchVideos(query, 10);
    if (!res.length) {
      await message.util!.send('Nothing found!');
      return Flag.cancel();
    }

    const embed = this.client.util
      .embed()
      .setColor(this.client.config.color)
      .addField('Results', res.map((vid: any, i: number) => `**${i + 1}:** ${vid.title}`))
      .setFooter(`Input a value from 1 to ${res.length}`);

    const pick = yield {
      type: Argument.range('integer', 1, res.length),
      match: 'none',
      prompt: {
        start: () => embed,
        modifyStart: (msg: Message, embed: MessageEmbed) => {
          const mention = message.author;
          return { mention, embed };
        },
        retry: 'You have to provide valid id.'
      }
    };

    return { id: res[pick - 1].id };
  }

  public async exec(message: Message, { id }: { id: string }) {
    return message.util!.send(`https://www.youtube.com/watch?v=${id}`);
  }
}

module.exports = YTCommand;

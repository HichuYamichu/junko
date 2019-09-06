const { Command, Argument, Flag } = require('discord-akairo');

class testCommand extends Command {
  constructor() {
    super('yt', {
      aliases: ['yt'],
      category: 'general',
      ownerOnly: false,
      channel: ['guild', 'dm'],
      description: {
        content: 'Searches YouTube.',
        usage: '<query>',
        examples: ['jpegmafia']
      }
    });
  }

  async *args(message) {
    if (!this.client.APIs.yt) return {};

    const query = yield {
      match: 'content',
      prompt: {
        start: message => `${message.author}, input your search query.`,
        retry: message => `${message.author}, you have to provide search query.`
      }
    };

    const res = await this.client.APIs.yt.searchVideos(query, 10);
    if (!res.length) {
      await message.util.send('Nothing found!');
      return Flag.cancel();
    }

    const embed = this.client.util
      .embed()
      .setColor(this.client.config.color)
      .addField('Results', res.map((vid, i) => `**${i + 1}:** ${vid.title}`))
      .setFooter(`Input a value from 1 to ${res.length}`);

    const pick = yield {
      type: Argument.range('integer', 1, res.length),
      match: 'none',
      prompt: {
        start: () => embed,
        modifyStart: (_, embed) => {
          const mention = message.author;
          return { mention, embed };
        },
        retry: message => `${message.author}, you have to provide valid id.`
      }
    };

    return { id: res[pick - 1].id };
  }

  async exec(message, { id }) {
    if (!this.client.APIs.yt) return message.util.send('YT functionality not enabled! You cannot use this command.');
    return message.util.send(`https://www.youtube.com/watch?v=${id}`);
  }
}

module.exports = testCommand;

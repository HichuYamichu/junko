const { Command } = require('discord-akairo');

class YouTubeCommand extends Command {
  constructor() {
    super('yt', {
      aliases: ['yt'],
      ownerOnly: false,
      util: ['guild', 'dm'],
      args: [
        {
          id: 'query',
          match: 'content',
          prompt: {
            start: message => `${message.author}, input your search query.`,
            retry: message => `${message.author}, you have to provide search query.`
          }
        }
      ]
    });
  }

  async exec(message, { query }) {
    console.log(query);
    const res = await this.client.yt.searchVideos(query, 10);
    let index = 0;
    await message.util.send(
      `${res
        .map(vid => `**${++index}:** ${vid.title}`)
        .join('\n')} \n**Provide a value to choose one of the search results.**`
    );
    try {
      const author = message.author.id;
      const msgFilter = msg =>
        !isNaN(msg.content) &&
        msg.content < res.length + 1 &&
        msg.content > 0 &&
        msg.author.id === author;
      const collected = await message.channel.awaitMessages(msgFilter, {
        max: 1,
        time: 15000,
        errors: ['time']
      });
      const value = parseInt(collected.first().content, 10);
      const { id } = res[value - 1];
      message.channel.send(`https://www.youtube.com/watch?v=${id}`);
    } catch (err) {
      message.channel.send("**Time's up!**");
    }
  }
}

module.exports = YouTubeCommand;

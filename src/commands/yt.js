module.exports = {
  name: 'yt',
  description: 'Searches YouTube.',
  args: 1,
  usage: '<query>',
  examples: ['yt jpegmafia'],
  guildOnly: false,
  cooldown: 5,
  aliases: [],
  permissionLVL: 0,
  async execute(message, args) {
    const query = await message.client.yt.searchVideos(args.toString().replace(',', ' '), 10);
    let index = 0;
    await message.channel.send(
      `${query
        .map(vid => `**${++index}:** ${vid.title}`)
        .join('\n')} \n**Provide a value to choose one of the search results.**`
    );
    try {
      const author = message.author.id;
      const msgFilter = msg =>
        !isNaN(msg.content) &&
        msg.content < query.length + 1 &&
        msg.content > 0 &&
        msg.author.id === author;
      const collected = await message.channel.awaitMessages(msgFilter, {
        max: 1,
        time: 15000,
        errors: ['time']
      });
      const value = parseInt(collected.first().content, 10);
      const { id } = query[value - 1];
      message.channel.send(`https://www.youtube.com/watch?v=${id}`);
    } catch (err) {
      message.channel.send("**Time's up!**");
    }
  }
};

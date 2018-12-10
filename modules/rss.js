module.exports.rss = async (client) => {
  let Parser = require('rss-parser');
  let parser = new Parser();

  (async () => {

  let feed = await parser.parseURL('https://danbooru.donmai.us/posts.atom');

  feed.items.forEach(item => {
    const server = client.guilds.find(guild => guild.id == 506150345391603722);
    const channel = server.channels.find(guildChannel => guildChannel.id == 511150024831401994);
    channel.send(item.link);
  });
})();
};

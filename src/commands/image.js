const Kaori = require('kaori');
const kaori = new Kaori();

module.exports = {
  name: 'image',
  description:
    'Sends a random image (always SFW on non-NSFW channels and always NSFW on NSFW channels)!',
  args: 1,
  usage: '<valid booru tags>',
  guildOnly: true,
  cooldown: 10,
  aliases: [],
  permissionLVL: 0,
  async execute(message, args) {
    const { UserError } = message.client;
    const tag = args.join(' ');
    const rating = message.channel.nsfw ? 'rating%3aexplicit' : 'rating%3Asafe';

    const [result] = await kaori.search('gelbooru', {
      tags: [rating, tag],
      limit: 1,
      random: true
    });
    if (!result) {
      throw new UserError(
        "No results! Are you sure your query is correct? Read https://danbooru.donmai.us/wiki_pages/43049 and if you still think it's not your fault notify the bot creator"
      );
    }
    message.channel.send({ files: [result.common.fileURL] });
  }
};

const Kaori = require('kaori');
const kaori = new Kaori();

module.exports = {
  name: 'image',
  description:
    'Sends a random image (always SFW on non-NSFW channels and always NSFW on NSFW channels)!',
  args: true,
  usage: '<valid booru tags>',
  guildOnly: true,
  cooldown: 10,
  async execute(message, args) {
    const tag = args.join(' ');
    const rating = message.channel.nsfw ? 'rating%3aexplicit' : 'rating%3Asafe';

    kaori
      .search('gelbooru', { tags: [rating, tag], limit: 1, random: true })
      .then(images =>
        message.channel.send({
          files: [images[0].common.fileURL]
        }))
      .catch(err => {
        message.channel.send(
          "Are you sure your query is correct? Read https://danbooru.donmai.us/wiki_pages/43049 and if you still think it's not your fault notify the bot creator"
        );
        console.error(err);
      });
  }
};

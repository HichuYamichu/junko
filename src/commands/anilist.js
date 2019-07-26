const axios = require('axios');
const { anilist: query } = require('../gql/queries');

module.exports = {
  name: 'anilist',
  description: 'searches anilist',
  args: 2,
  usage: '[manga | anime] <title>',
  guildOnly: false,
  cooldown: 5,
  aliases: ['anim'],
  permissionLVL: 0,
  async execute(message, args) {
    const { UserError } = message.client;
    const url = 'https://graphql.anilist.co';
    const type = args[0].toUpperCase();
    if (!(type === 'ANIME' || type === 'MANGA')) {
      throw new UserError('Invalid query type (manga, anime supported)');
    }
    const search = args.slice(1).join(' ');
    const variables = { search, type };
    try {
      const {
        data: { data }
      } = await axios.post(url, { query, variables });
      message.channel.send(`https://anilist.co/${type.toLowerCase()}/${data.Media.id}`);
    } catch (err) {
      const msg = err.response.status === 404 ? 'Nothing found!' : 'Unknown problem occurred!';
      throw new UserError(msg);
    }
  }
};

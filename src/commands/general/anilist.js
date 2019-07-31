const { Command } = require('discord-akairo');
const { anilist: query } = require('../../util/gql');
const axios = require('axios');

class AnilistCommand extends Command {
  constructor() {
    super('anilist', {
      aliases: ['anilist', 'ani'],
      ownerOnly: false,
      channel: ['guild', 'dm'],
      args: [
        {
          id: 'type',
          type: ['ANIME', 'MANGA']
        },
        {
          id: 'search',
          match: 'rest'
        }
      ]
    });
  }

  async exec(message, { search, type }) {
    const url = 'https://graphql.anilist.co';
    const variables = { search, type };
    try {
      const {
        data: { data }
      } = await axios.post(url, { query, variables });
      message.util.send(`https://anilist.co/${type.toLowerCase()}/${data.Media.id}`);
    } catch (err) {
      const msg = err.response.status === 404 ? 'Nothing found!' : 'Unknown problem occurred!';
      message.util.send(msg);
    }
  }
}

module.exports = AnilistCommand;

const YouTube = require('simple-youtube-api');
const SpotifyWebApi = require('spotify-web-api-node');
const logger = require('./Logger');

let yt;
let spotify;

module.exports = class APIManager {
  static get yt() {
    return yt;
  }

  static get spotify() {
    return spotify;
  }

  static async init() {
    try {
      yt = new YouTube(process.env.YT_KEY);

      spotify = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_ID,
        clientSecret: process.env.SPOTIFY_SECRET
      });

      const { body } = await spotify.clientCredentialsGrant();
      spotify.setAccessToken(body.access_token);
    } catch (e) {
      logger.error(e);
    }
  }
};

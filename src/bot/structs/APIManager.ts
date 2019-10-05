const YouTube = require('simple-youtube-api');
import * as SpotifyWebApi  from 'spotify-web-api-node';
import Logger from './Logger';

export default class APIManager {
  spotify: SpotifyWebApi;
  yt: any;

  public constructor() {
    this.spotify = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_ID,
      clientSecret: process.env.SPOTIFY_SECRET
    });

    this.yt = new YouTube(process.env.YT_KEY);
  }

  public async init() {
    try {
      const { body } = await this.spotify.clientCredentialsGrant();
      this.spotify.setAccessToken(body.access_token);
    } catch (e) {
      Logger.error(e);
    }
  }
}

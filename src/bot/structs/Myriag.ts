import axios, { AxiosInstance } from 'axios';
import { languages } from '../util/languages';
import { Config } from './Config';
import { Logger } from './Logger';

export class Myriag {
  private readonly client: AxiosInstance;

  private readonly aliases: Map<string, string> = new Map();

  public constructor(config: Config) {
    for (const [lang, aliases] of languages) {
      for (const alias of aliases) {
        this.aliases.set(alias, lang);
      }
    }

    this.client = axios.create({
      baseURL: config.myriag_url,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public getLanguageByAlias(alias: string) {
    return this.aliases.get(alias.toLowerCase());
  }

  public async getLanguages() {
    const { data } = await this.client.get<string[]>('/languages');
    return data;
  }

  public async getContainers() {
    const { data } = await this.client.get<string[]>('/containers');
    return data;
  }

  public async cleanup() {
    const { data } = await this.client.post<string[]>('/cleanup');
    return data;
  }

  public async eval(language: string, code: string) {
    try {
      const {
        data: { result }
      } = await this.client.post<{ result: string }>('/eval', {
        language,
        code
      });
      return result || '\n';
    } catch (e) {
      Logger.warn(e);
      switch (e.response.status) {
        case 404:
          return `Invalid language ${language}`;
        case 500:
          return 'Evaluation failed';
        case 504:
          return 'Evaluation timed out';
        default:
          throw new Error(
            `Unexpected ${e.response.status} response from Myriag, ${e.response.statusText}`
          );
      }
    }
  }
}

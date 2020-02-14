import axios from 'axios';
import { languages } from '../util/languages';

export class Myriag {
  private readonly client = axios.create({
    baseURL: process.env.MYRIAG_URL!,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  private readonly aliases: Map<string, string> = new Map();

  public constructor() {
    for (const [lang, aliases] of languages) {
      for (const alias of aliases) {
        this.aliases.set(alias, lang);
      }
    }
  }

  public getLanguageByAlias(alias: string) {
    return this.aliases.get(alias.toLowerCase());
  }

  public async getLanguages() {
    const { data } = await this.client.get<string[]>('/api/languages');
    return data;
  }

  public async getContainers() {
    const { data } = await this.client.get<string[]>('/api/containers');
    return data;
  }

  public async createContainer(language: string) {
    const res = await this.client.post('/api/create_container', { language });
    return res.status === 201;
  }

  public async cleanup() {
    const { data } = await this.client.post<string[]>('/api/cleanup');
    return data;
  }

  public async eval(language: string, code: string) {
    try {
      const {
        data: { result }
      } = await this.client.post<{ result: string }>('/api/eval', {
        language,
        code
      });
      return result || '\n';
    } catch (e) {
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

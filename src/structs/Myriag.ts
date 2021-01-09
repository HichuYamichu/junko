import { languages } from '../util/languages';
import fetch from 'node-fetch';

export class Myriag {
  private readonly aliases: Map<string, string> = new Map();

  private readonly baseURL: string;

  public constructor(url: string) {
    for (const [lang, aliases] of languages) {
      for (const alias of aliases) {
        this.aliases.set(alias, lang);
      }
    }

    this.baseURL = url;
  }

  private url(p: string): string {
    return `${this.baseURL}/${p}`;
  }

  public getLanguageByAlias(alias: string): string {
    return this.aliases.get(alias.toLowerCase());
  }

  public async getLanguages(): Promise<string[]> {
    return fetch(this.url('languages'), { method: 'GET' }).then(x => x.json());
  }

  public async getContainers(): Promise<string[]> {
    return fetch(this.url('containers'), { method: 'GET' }).then(x => x.json());
  }

  public async cleanup(): Promise<string[]> {
    return fetch(this.url('cleanup'), { method: 'POST' }).then(x => x.json());
  }

  public async eval(language: string, code: string): Promise<string> {
    const response = await fetch(this.url('eval'), {
      method: 'POST',
      body: JSON.stringify({ language, code }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      const status = response.status;
      const text = await response.text();
      if (status === 404 && text === `Language ${language} was not found`) {
        return `Invalid language ${language}`;
      }

      if (status === 500 && text === 'Evaluation failed') {
        return 'Evaluation failed';
      }

      if (status === 504 && text === 'Evaluation timed out') {
        return 'Evaluation timed out';
      }

      throw new Error(`Unexpected ${response.status} response from Myriad, ${response.statusText}`);
    }

    const body = await response.json();
    return body.result || '\n';
  }
}

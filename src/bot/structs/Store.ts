import { Guild } from 'discord.js';
import { Repository } from 'typeorm';
import SettingsCache from './Cache';
import { Settings } from '../models/Settings';

export default class SettingsProvider {
  public constructor(private repo: Repository<Settings>, private cache: SettingsCache) {}

  public async get(guild: Guild | null, key: string, defaultValue: any): Promise<any> {
    const id = SettingsProvider.getGuildID(guild);
    const cached = await this.cache.getCached(id, key);
    if (cached) return cached;

    const res = await this.repo.findOne(undefined, { where: { guild: id } });
    if (!res) return defaultValue;
    // @ts-ignore
    const value = (res as Settings)[key];
    await this.cache.setCache(id, key, value);
    return value;
  }

  private static getGuildID(guild: Guild | null) {
    if (guild instanceof Guild) return guild.id;
    if (!guild) return 'global';
    throw new TypeError('Invalid guild.');
  }
}

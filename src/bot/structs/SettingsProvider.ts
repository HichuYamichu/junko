import { Guild } from 'discord.js';
import { Repository } from 'typeorm';
import { Settings } from '../models/Settings';
import cache from './Cache';

export default class SettingsProvider {
  public constructor(private readonly repo: Repository<Settings>) {}

  public async get(guild: string | Guild, key: string, defaultValue: any): Promise<any> {
    const id = SettingsProvider.getGuildID(guild);
    const cached = await cache.get(id, key);
    if (cached) return cached;

    const res = await this.repo
      .createQueryBuilder()
      .select(`Settings.${key}`, key)
      .where('Settings.guild = :id', { id })
      .getRawOne();
    if (!res) return defaultValue;
    // @ts-ignore
    const value = (res as Settings)[key];
    await cache.set(id, key, value);
    return value;
  }

  public async set(guild: string | Guild, key: string, value: string): Promise<any> {
    const id = SettingsProvider.getGuildID(guild);
    await cache.del(id, key);
    return this.repo
      .createQueryBuilder()
      .insert()
      .into(Settings)
      .values({ guild: id, [key]: value })
      .onConflict(`("guild") DO UPDATE SET "${key}" = :${key}`)
      .setParameter(key, value)
      .execute();
  }

  public async del(guild: string | Guild, key: string) {
    const id = SettingsProvider.getGuildID(guild);
    await cache.del(id, key);
    return this.repo
      .createQueryBuilder()
      .update()
      .where(id)
      .set({ [key]: null })
      .execute();
  }

  public async clear(guild: string | Guild) {
    const id = SettingsProvider.getGuildID(guild);
    await cache.clear(id);
    return this.repo
      .createQueryBuilder()
      .delete()
      .where(id)
      .execute();
  }

  private static getGuildID(guild: string | Guild) {
    if (guild instanceof Guild) return guild.id;
    if (guild === 'global' || guild === null) return 'global';
    if (typeof guild === 'string' && /^\d+$/.test(guild)) return guild;
    throw new TypeError('Invalid guild');
  }
}

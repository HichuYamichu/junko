import { Guild } from 'discord.js';
import { Repository, InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { Settings } from '../models/Settings';
import cache from './Cache';

export default class SettingsProvider {
  // eslint-disable-next-line no-useless-constructor
  public constructor(private readonly repo: Repository<Settings>) {}

  public async get<T>(guild: string | Guild, key: string, defaultValue: T): Promise<T> {
    const id = SettingsProvider.getGuildID(guild);
    const cached = await cache.get(id, key);
    if (cached) {
      return typeof defaultValue === 'string' ? ((cached as unknown) as T) : JSON.parse(cached);
    }

    const res = await this.repo
      .createQueryBuilder()
      .select(`Settings.${key}`, key)
      .where('Settings.guild = :id', { id })
      .getRawOne();
    if (!res) return defaultValue;

    const value = res[key];
    if (!value) return defaultValue;

    await cache.set(id, key, value);
    return (value as unknown) as T;
  }

  public async set(guild: string | Guild, key: string, value: string): Promise<InsertResult> {
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

  public async del(guild: string | Guild, key: string): Promise<UpdateResult> {
    const id = SettingsProvider.getGuildID(guild);
    await cache.del(id, key);
    return this.repo
      .createQueryBuilder()
      .update()
      .where(id)
      .set({ [key]: null })
      .execute();
  }

  public async clear(guild: string | Guild): Promise<DeleteResult> {
    const id = SettingsProvider.getGuildID(guild);
    await cache.clear(id);
    return this.repo
      .createQueryBuilder()
      .delete()
      .where(id)
      .execute();
  }

  private static getGuildID(guild: string | Guild): string {
    if (guild instanceof Guild) return guild.id;
    if (guild === 'global' || guild === null) return 'global';
    if (typeof guild === 'string' && /^\d+$/.test(guild)) return guild;
    throw new TypeError('Invalid guild');
  }
}

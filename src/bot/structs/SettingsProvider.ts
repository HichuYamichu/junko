import { Guild } from 'discord.js';
import { Repository, InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { Settings } from '../models/Settings';
import { SettingsCache } from './Cache';

export class SettingsProvider {
  private readonly cache = new SettingsCache();

  public constructor(private readonly repo: Repository<Settings>) {}

  public async get<K extends keyof Settings>(
    guild: string | Guild,
    key: K,
    defaultValue: Settings[K]
  ): Promise<Settings[K]> {
    const id = this.getGuildID(guild);
    const cached = await this.cache.get(id, key);
    if (cached) {
      return typeof defaultValue === 'string' ? cached : JSON.parse(cached);
    }

    const res = await this.repo.findOne(id, { select: [key] });
    if (!res) return defaultValue;
    const value = res[key];
    if (!value) return defaultValue;

    await this.cache.set(id, key, value);
    return value;
  }

  public async set(guild: string | Guild, key: string, value: string): Promise<InsertResult> {
    const id = this.getGuildID(guild);
    await this.cache.del(id, key);
    return this.repo
      .createQueryBuilder()
      .insert()
      .values({ guild: id, [key]: value })
      .onConflict(`("guild") DO UPDATE SET "${key}" = :${key}`)
      .setParameter(key, value)
      .execute();
  }

  public async del(guild: string | Guild, key: string): Promise<UpdateResult> {
    const id = this.getGuildID(guild);
    await this.cache.del(id, key);
    return this.repo
      .createQueryBuilder()
      .update()
      .where(id)
      .set({ [key]: null })
      .execute();
  }

  public async clear(guild: string | Guild): Promise<DeleteResult> {
    const id = this.getGuildID(guild);
    await this.cache.clear(id);
    return this.repo
      .createQueryBuilder()
      .delete()
      .where(id)
      .execute();
  }

  private getGuildID(guild: string | Guild): string {
    if (guild instanceof Guild) return guild.id;
    if (guild === 'global' || guild === null) return 'global';
    if (typeof guild === 'string' && /^\d+$/.test(guild)) return guild;
    throw new TypeError('Invalid guild');
  }
}

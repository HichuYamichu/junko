import { Guild } from 'discord.js';
import { cache } from './Database';
import Settings from '../models/Settings';

export default class SettingsProvider {
  public async get(guild: Guild | null, key: string, defaultValue: string) {
    const id = SettingsProvider.getGuildID(guild);
    const cached = await SettingsProvider.getCached(id, key);
    if (cached) return cached;

    const res = await Settings.findByPk(id, { attributes: [key] });
    if (!res) return defaultValue;

    res.toJSON();
    const value = res[key];
    if (!value) return defaultValue;

    await SettingsProvider.setCache(id, key, value);
    return value;
  }

  public async set(guild: Guild | null, key: string, value: string) {
    const id = SettingsProvider.getGuildID(guild);
    await SettingsProvider.delCached(id, key);
    const data = { guildID: id, [key]: value };
    return Settings.upsert(data);
  }

  public async del(guild: Guild | null, key: string) {
    const id = SettingsProvider.getGuildID(guild);
    await SettingsProvider.delCached(id, key);
    const data = { [key]: null };
    return Settings.update(data, { where: { guildID: id } });
  }

  public async clear(guild: Guild | null) {
    const id = SettingsProvider.getGuildID(guild);
    await SettingsProvider.clearCached(id);
    return Settings.destroy({ where: { guildID: id } });
  }

  

  private static getGuildID(guild: any) {
    if (guild instanceof Guild) return guild.id;
    if (typeof guild === 'string' && /^\d+$/.test(guild)) return guild;
    if (!guild) return 'global';
    throw new TypeError('Invalid guild.');
  }
}

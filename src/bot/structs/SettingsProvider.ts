import { Guild, Collection } from 'discord.js';
import { Provider } from 'discord-akairo';
import { Repository } from 'typeorm';
import { Settings } from '../models/Settings';

export class SettingsProvider extends Provider {
  public constructor(private readonly repo: Repository<Settings>) {
    super();
  }

  public items!: Collection<string, Settings>;

  public async init() {
    const settings = await this.repo.find();
    for (const setting of settings) {
      this.items.set(setting.guild, setting);
    }
  }

  public async get<K extends keyof Settings>(
    guild: string | Guild,
    key: K,
    defaultValue: Settings[K]
  ): Promise<Settings[K]> {
    const id = this.getGuildID(guild);
    const cached = this.items.get(id);
    if (cached) {
      const value = cached[key];
      return value === null ? defaultValue : value;
    }

    return defaultValue;
  }

  public async set<K extends keyof Settings>(guild: string | Guild, key: K, value: Settings[K]) {
    const id = this.getGuildID(guild);
    const settings = this.items.get(id) || new Settings();
    settings.guild = id;
    settings[key] = value;
    this.items.set(id, settings);
    await this.repo.save(settings);
  }

  public async delete(guild: string | Guild, key: keyof Settings) {
    const id = this.getGuildID(guild);
    const cashed = this.items.get(id);
    if (cashed?.[key] !== null) {
      delete cashed[key];
      this.items.set(id, cashed);
      await this.repo.save(cashed);
    }
  }

  public async clear(guild: string | Guild) {
    const id = this.getGuildID(guild);
    if (this.items.has(id)) {
      this.items.delete(id);
      await this.repo.delete({ guild: id });
    }
  }

  private getGuildID(guild: string | Guild): string {
    if (guild instanceof Guild) return guild.id;
    if (guild === 'global' || guild === null) return 'global';
    if (typeof guild === 'string' && /^\d+$/.test(guild)) return guild;
    throw new TypeError('Invalid guild');
  }
}

import * as Redis from 'ioredis';

export class SettingsCache {
  public cache = new Redis({
    host: process.env.REDIS_HOST,
    keyPrefix: 'settings:',
    autoResendUnfulfilledCommands: false
  });

  public get(id: string, key: string): Promise<string | null> {
    return this.cache.hget(id, key);
  }

  public set(id: string, key: string, data: string | object): Promise<0 | 1> {
    const cacheObject = typeof data === 'object' ? JSON.stringify(data) : data;
    return this.cache.hset(id, key, cacheObject);
  }

  public del(id: string, key: string): any {
    return this.cache.hdel(id, key);
  }

  public clear(id: string): Promise<number> {
    return this.cache.del(id);
  }
}

import Redis from 'ioredis';

const cache = new Redis({
  host: process.env.REDIS_HOST,
  keyPrefix: 'settings:',
  autoResendUnfulfilledCommands: false
});

export default class SettingsCache {
  public static get(id: string, key: string): Promise<string | null> {
    return cache.hget(id, key);
  }

  public static set(id: string, key: string, data: string | object): Promise<0 | 1> {
    const cacheObject = typeof data === 'object' ? JSON.stringify(data) : data;
    return cache.hset(id, key, cacheObject);
  }

  public static del(id: string, key: string): any {
    return cache.hdel(id, key);
  }

  public static clear(id: string): Promise<number> {
    return cache.del(id);
  }
}

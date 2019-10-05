import Redis from 'ioredis';

const cache = new Redis({
  host: process.env.REDIS_HOST,
  keyPrefix: 'settings:',
  autoResendUnfulfilledCommands: false
});

export default class SettingsCache {
  public static get(id: string, key: string) {
    if (cache.status !== 'ready') return null;
    return cache.hget(id, key);
  }

  public static set(id: string, key: string, data: any) {
    if (cache.status !== 'ready') return null;
    const cacheObject = typeof data === 'object' ? JSON.stringify(data) : data;
    return cache.hset(id, key, cacheObject);
  }

  public static del(id: string, key: string) {
    if (cache.status !== 'ready') return null;
    return cache.hdel(id, key);
  }

  public static clear(id: string) {
    if (cache.status !== 'ready') return null;
    return cache.del(id);
  }
}

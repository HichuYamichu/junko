import Redis from 'ioredis';

class SettingsCache {
  private cache: Redis.Redis;

  public constructor() {
    this.cache = new Redis({
      host: process.env.REDIS_HOST,
      keyPrefix: 'settings:',
      autoResendUnfulfilledCommands: false
    });
  }

  public getCached(id: string, key: string) {
    if (this.cache.status !== 'ready') return null;
    return this.cache.hget(id, key);
  }

  public setCache(id: string, key: string, data: any) {
    if (this.cache.status !== 'ready') return null;
    const cacheObject = typeof data === 'object' ? JSON.stringify(data) : data;
    return this.cache.hset(id, key, cacheObject);
  }

  public delCached(id: string, key: string) {
    if (this.cache.status !== 'ready') return null;
    return this.cache.hdel(id, key);
  }

  public clearCached(id: string) {
    if (this.cache.status !== 'ready') return null;
    return this.cache.del(id);
  }
}

export default SettingsCache;

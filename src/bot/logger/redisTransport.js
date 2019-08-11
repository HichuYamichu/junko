const Transport = require('winston-transport');

module.exports = class RedisTransport extends Transport {
  constructor(opts, redis) {
    super(opts);
    this.name = opts.name || 'redis';
    this.redis = redis;
  }

  log(info, callback) {
    setImmediate(() => this.emit('logged', info));
    const { timestamp, level, message, event, ...rest } = info;
    const msg = `[${timestamp}][${level.toUpperCase()}]${event ? `[${event}]` : ''}: ${message}${
      Object.keys(rest).length
        ? `${rest.stack ? `\n${rest.stack}` : JSON.stringify(rest, null, 2)}`
        : ''
    }`;

    this.redis.rpushAsync('logs', msg);

    callback();
  }
};

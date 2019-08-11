const { createLogger, transports, format } = require('winston');
const RedisTransport = require('./redisTransport');

module.exports = redisClient =>
  createLogger({
    format: format.combine(
      format.errors({ stack: true }),
      format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss' }),
      format.printf(info => {
        const { timestamp, level, message, event, ...rest } = info;
        return `[${timestamp}][${level.toUpperCase()}]${event ? `[${event}]` : ''}: ${message}${
          Object.keys(rest).length
            ? `${rest.stack ? `\n${rest.stack}` : JSON.stringify(rest, null, 2)}`
            : ''
        }`;
      })
    ),
    transports: [
      new transports.Console({
        level: 'info'
      }),
      new RedisTransport(
        {
          level: 'info'
        },
        redisClient
      )
    ]
  });

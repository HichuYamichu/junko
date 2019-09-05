const moment = require('moment');
const { inspect } = require('util');

module.exports = class Logger {
  static info(content) {
    const level = 'INFO';
    this.write(content, level);
  }

  static warn(content) {
    const level = 'WARN';
    this.write(content, level);
  }

  static error(content) {
    const level = 'ERROR';
    this.write(content, level);
  }

  static write(content, level) {
    const out = level === 'ERROR' ? process.stderr : process.stdout;
    const now = moment.utc().format('DD/MM/YYYY HH:mm:ss');
    const log = `[${now}][${level}]: ${this.clean(content)}\n`;
    out.write(log);
  }

  static clean(item) {
    if (typeof item === 'string') return item;
    const cleaned = inspect(item, { depth: Infinity });
    return cleaned;
  }
};

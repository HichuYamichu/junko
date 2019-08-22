const moment = require('moment');

let store;

module.exports = class Logger {
  static _init(storeInstance) {
    store = storeInstance;
  }

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
    const out = level === 'ERROR' ? process.stdout : process.stderr;
    const now = moment.utc().format('DD/MM/YYYY HH:mm:ss');
    const log = `[${now}][${level}]: ${content}\n`;
    out.write(log);
    store.saveLog(log);
  }
};

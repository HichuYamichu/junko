import { utc } from 'moment';
import { inspect } from 'util';

export default class Logger {
  public static info(content: string) {
    const level = 'INFO';
    this.write(content, level);
  }

  public static warn(content: string) {
    const level = 'WARN';
    this.write(content, level);
  }

  public static error(content: string | {} | null | undefined) {
    const level = 'ERROR';
    this.write(content, level);
  }

  private static write(content: string | {} | null | undefined, level: string) {
    const out = level === 'ERROR' ? process.stderr : process.stdout;
    const now = utc().format('DD/MM/YYYY HH:mm:ss');
    const log = `[${now}][${level}]: ${this.clean(content)}\n`;
    out.write(log);
  }

  private static clean(item: string | {} | null | undefined) {
    if (typeof item === 'string') return item;
    const cleaned = inspect(item, { depth: Infinity });
    return cleaned;
  }
}

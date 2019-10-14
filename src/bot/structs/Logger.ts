import { utc } from 'moment';
import { inspect } from 'util';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class Logger {
  public static info(content: string): void {
    const level = 'INFO';
    this.write(content, level);
  }

  public static warn(content: string): void {
    const level = 'WARN';
    this.write(content, level);
  }

  public static error(content: string | {} | null | undefined): void {
    const level = 'ERROR';
    this.write(content, level);
  }

  private static write(content: string | {} | null | undefined, level: string): void {
    const out = level === 'ERROR' ? process.stderr : process.stdout;
    const now = utc().format('DD/MM/YYYY HH:mm:ss');
    const log = `[${now}][${level}]: ${this.clean(content)}\n`;
    out.write(log);
  }

  private static clean(item: string | {} | null | undefined): string {
    if (typeof item === 'string') return item;
    const cleaned = inspect(item, { depth: Infinity });
    return cleaned;
  }
}

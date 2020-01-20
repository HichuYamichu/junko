import { utc } from 'moment';
import { inspect } from 'util';

export class Logger {
  public info(content: string): void {
    const level = 'INFO';
    this.write(level, content);
  }

  public warn(content: string): void {
    const level = 'WARN';
    this.write(level, content);
  }

  public error(content?: string | {} | null): void {
    const level = 'ERROR';
    this.write(level, content);
  }

  private write(level: string, content?: string | {} | null): void {
    const out = level === 'ERROR' ? process.stderr : process.stdout;
    const now = utc().format('DD/MM/YYYY HH:mm:ss');
    const log = `[${now}][${level}]: ${this.clean(content)}\n`;
    out.write(log);
  }

  private clean(item?: string | {} | null): string {
    if (typeof item === 'string') return item;
    const cleaned = inspect(item, { depth: Infinity });
    return cleaned;
  }
}

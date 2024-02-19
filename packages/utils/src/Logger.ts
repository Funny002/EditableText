export class Logger {
  private readonly name: string;

  constructor(name?: string) {
    this.name = name || 'Logger';
  }

  sendMessage(type: 'log' | 'info' | 'warn' | 'error' | 'debug', ...args: any[]) {
    console[type](`[${this.name}] `, ...args);
  }

  log(...args: any[]) {
    this.sendMessage('log', ...args);
  }

  info(...args: any[]) {
    this.sendMessage('info', ...args);
  }

  warn(...args: any[]) {
    this.sendMessage('warn', ...args);
  }

  error(...args: any[]) {
    this.sendMessage('error', ...args);
  }

  debug(...args: any[]) {
    this.sendMessage('debug', ...args);
  }
}
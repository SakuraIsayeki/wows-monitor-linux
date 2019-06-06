import { Injectable } from '@angular/core';
import { LoggerService } from '../../interfaces/logger.service';

@Injectable()
export class ConsoleLoggerService implements LoggerService {

  constructor() { }

  debug(...args: any[]) {
    console.log(...args);
  }

  warn(...args: any[]) {
    console.warn(args);
  }

  error(...args: any[]) {
    console.error(...args);
  }
}

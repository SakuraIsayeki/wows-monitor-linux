import { Injectable } from '@angular/core';
import { LoggerService } from '../../interfaces/logger.service';
import { environment } from 'src/environments/environment.browser';

@Injectable()
export class ConsoleLoggerService implements LoggerService {

  constructor() { }

  debug(...args: any[]) {
    console.log(...args);
  }

  error(...args: any[]) {
    if (environment.production) {
      console.warn(...args);
    } else {
      console.error(...args);
    }
  }
}

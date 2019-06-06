import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';
import { LoggerService } from '../../interfaces/logger.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class ElectronLoggerService implements LoggerService {

  constructor(private electronService: ElectronService) { }

  debug(...args: any[]) {
    if (environment.production) {
      this.electronService.ipcRenderer.send('log-debug', args);
    } else {
      console.log(...args);
    }
  }

  warn(...args: any[]) {
    if (environment.production) {
      this.electronService.ipcRenderer.send('log-warn', args);
    } else {
      console.warn(...args);
    }
  }

  error(...args: any[]) {
    if (environment.production) {
      this.electronService.ipcRenderer.send('log-error', args);
    } else {
      console.error(...args);
    }
  }
}

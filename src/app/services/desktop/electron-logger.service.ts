import { Inject, Injectable } from '@angular/core';
import { ElectronService, ElectronServiceToken } from '@interfaces/electron.service';
import { environment } from '@environments/environment';
import { LoggerService } from '@interfaces/logger.service';

@Injectable()
export class ElectronLoggerService implements LoggerService {

  constructor(@Inject(ElectronServiceToken) private electronService: ElectronService) { }

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

import { Inject } from '@angular/core';
import { UpdateCheckResult } from 'electron-updater';
import { Observable, Observer, of, BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ElectronService } from './electron.service';
import { LoggerService, LoggerServiceToken } from '../../interfaces/logger.service';
import { UpdateService } from '../../interfaces/update.service';
import { Config } from 'src/config/config';

export class ElectronUpdateService implements UpdateService {

  private _$updateAvailable = new BehaviorSubject<any>(null);

  public get $updateAvailable() {
    return this._$updateAvailable.asObservable();
  }

  constructor(
    private electronService: ElectronService,
    private config: Config,
    @Inject(LoggerServiceToken) private loggerService: LoggerService
  ) {
    electronService.ipcRenderer.on('checking-for-update', () => { });
    electronService.ipcRenderer.on('update-available', () => {
      loggerService.debug('update-available');
    })
    electronService.ipcRenderer.on('update-not-available', () => {
      this._$updateAvailable.next(false);
    })
    electronService.ipcRenderer.on('update-error', () => {
      this._$updateAvailable.next(false);
    })
    electronService.ipcRenderer.on('download-progress', (event, progressObj: { percent: number }) => {

    })
    electronService.ipcRenderer.on('update-downloaded', () => {
      this._$updateAvailable.next(true);
    });
  }


  public checkForUpdate() {
    if (this.config.autoUpdate) {
      this.electronService.ipcRenderer.send('checkForUpdate');
    } else {
      this._$updateAvailable.next(false);
    }
    return new Promise<boolean>(resolve => resolve(true));
  }

  public quitAndInstall() {
    this.electronService.ipcRenderer.send('quitAndInstall');
  }
}

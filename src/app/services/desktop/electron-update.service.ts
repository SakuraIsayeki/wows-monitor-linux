import { Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ElectronService, ElectronServiceToken } from 'src/app/interfaces/electron.service';
import { Config } from 'src/config/config';
import { LoggerService, LoggerServiceToken } from '../../interfaces/logger.service';
import { UpdateService } from '../../interfaces/update.service';

export class ElectronUpdateService implements UpdateService {

  private _$updateAvailable = new BehaviorSubject<boolean>(null);
  private _$updateProgress = new BehaviorSubject<number>(0);

  updateChecked: boolean;

  get $updateAvailable() {
    return this._$updateAvailable.asObservable();
  }

  get $updateProgress() {
    return this._$updateProgress.asObservable();
  }

  constructor(
    @Inject(ElectronServiceToken) private electronService: ElectronService,
    private config: Config,
    @Inject(LoggerServiceToken) private loggerService: LoggerService
  ) {
    electronService.ipcRenderer.on('checking-for-update', () => { });
    electronService.ipcRenderer.on('update-available', () => {
      loggerService.debug('update-available');
      this._$updateAvailable.next(true);
    });

    electronService.ipcRenderer.on('update-not-available', () => {
      loggerService.debug('update-not-available');
      this._$updateAvailable.next(false);
    });

    electronService.ipcRenderer.on('update-error', (event) => {
      loggerService.debug('update-error', event);
      this._$updateAvailable.next(false);
    });

    electronService.ipcRenderer.on('download-progress', (event, progressObj: { percent: number }) => {
      loggerService.debug('download-progress', progressObj.percent);
      this._$updateProgress.next(progressObj.percent);
    });

    electronService.ipcRenderer.on('update-downloaded', () => {
      loggerService.debug('update-downloaded');
      this._$updateAvailable.next(true);
    });
  }


  async checkForUpdate() {
    await this.config.waitTillLoaded();
    if (this.config.autoUpdate && this.electronService.isWindows()) {
      this.electronService.ipcRenderer.send('checkForUpdate');
    } else {
      this._$updateAvailable.next(false);
    }
  }

  quitAndInstall() {
    this.electronService.ipcRenderer.send('quitAndInstall');
  }
}

import { Inject } from '@angular/core';
import { SettingsService } from '@services/settings.service';
import { BehaviorSubject } from 'rxjs';
import { ElectronService, ElectronServiceToken } from '@interfaces/electron.service';
import { LoggerService, LoggerServiceToken } from '@interfaces/logger.service';
import { UpdateService } from '@interfaces/update.service';

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
    private settingsService: SettingsService,
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
    await this.settingsService.waitForInitialized();
    if (this.settingsService.form.monitorConfig.autoUpdate.model && this.electronService.isWindows()) {
      this.electronService.ipcRenderer.send('checkForUpdate');
    } else {
      this._$updateAvailable.next(false);
    }
  }

  quitAndInstall() {
    this.electronService.ipcRenderer.send('quitAndInstall');
  }
}

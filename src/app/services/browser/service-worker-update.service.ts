import { Inject } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { environment } from '@environments/environment';
import { LoggerService, LoggerServiceToken } from '@interfaces/logger.service';
import { UpdateService } from '@interfaces/update.service';
import { BaseInjection } from '@stewie/framework';
import { BehaviorSubject } from 'rxjs';

export class ServiceWorkerUpdateService extends BaseInjection implements UpdateService {

  private _$updateAvailable = new BehaviorSubject<boolean>(null);
  private _$updateProgress = new BehaviorSubject<number>(0);

  updateChecked = false;

  get $updateAvailable() {
    return this._$updateAvailable.asObservable();
  }

  get $updateProgress() {
    return this._$updateProgress.asObservable();
  }

  constructor(
    private swUpdate: SwUpdate,
    @Inject(LoggerServiceToken) private logger: LoggerService) {
    super();
    this.swUpdate.available.subscribe(event => {
      if (environment.browser) {
        this.uiWarn('restartForUpdate');
        setTimeout(() => this.quitAndInstall(), 3000);
      } else {
        this._$updateAvailable.next(true);
      }
    });
  }

  checkForUpdate() {
    this.swUpdate.checkForUpdate();
  }

  quitAndInstall() {
    this.logger.debug('[Updater]', '(quitAndInstall)');
    this.swUpdate.activateUpdate().then(() => {
      this.logger.debug('[Updater]', '(activateUpdate)');
      window.location.reload();
    });
  }

}

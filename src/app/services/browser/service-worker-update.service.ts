import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject, interval } from 'rxjs';
import { UpdateService } from '../../interfaces/update.service';

export class ServiceWorkerUpdateService implements UpdateService {

  private _$updateAvailable = new BehaviorSubject<boolean>(null);
  private _$updateProgress = new BehaviorSubject<number>(0);

  get $updateAvailable() {
    return this._$updateAvailable.asObservable();
  }

  get $updateProgress() {
    return this._$updateProgress.asObservable();
  }

  constructor(private swUpdate: SwUpdate) {
    this.swUpdate.available.subscribe(event => {
      this._$updateAvailable.next(true);
    });
  }

  checkForUpdate() {
    this.swUpdate.checkForUpdate();
  }

  quitAndInstall() {
    this.swUpdate.activateUpdate().then(() => {
      window.location.reload();
    });
  }

}

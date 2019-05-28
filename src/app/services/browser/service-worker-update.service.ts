import { SwUpdate } from '@angular/service-worker';
import { Observable, BehaviorSubject } from 'rxjs';
import { UpdateService } from '../../interfaces/update.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export class ServiceWorkerUpdateService implements UpdateService {

  private _$updateAvailable = new BehaviorSubject<boolean>(null);

  public get $updateAvailable() {
    return this._$updateAvailable.asObservable();
  }

  constructor(private swUpdate: SwUpdate) {
    this.swUpdate.available.subscribe(event => {
      this._$updateAvailable.next(true);
    });
  }

  async checkForUpdate() {
    await this.swUpdate.checkForUpdate();
    return (await this.swUpdate.available.toPromise()) != null;
  }

  quitAndInstall() {
    this.swUpdate.activateUpdate().then(() => {
      window.location.reload();
    });
  }

}

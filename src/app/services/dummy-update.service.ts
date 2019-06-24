import { Observable } from 'rxjs';
import { UpdateService } from '../interfaces/update.service';

export class DummyUpdateService implements UpdateService {

  $updateAvailable: Observable<any>;
  $updateProgress: Observable<number>;

  constructor() { }

  checkForUpdate() {
    return new Promise<boolean>(resolve => resolve(false));
  }

  quitAndInstall() {
  }

}

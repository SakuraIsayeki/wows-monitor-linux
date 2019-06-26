import { Observable, of } from 'rxjs';
import { UpdateService } from '../interfaces/update.service';

export class DummyUpdateService implements UpdateService {

  $updateAvailable: Observable<boolean> = of(false);
  $updateProgress: Observable<number>;

  constructor() { }

  checkForUpdate() {
  }

  quitAndInstall() {
  }

}

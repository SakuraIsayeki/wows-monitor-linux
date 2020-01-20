import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const UpdateServiceToken = new InjectionToken('update-service');

export interface UpdateService {

  updateChecked: boolean;

  $updateAvailable: Observable<boolean>;
  $updateProgress: Observable<number>;

  checkForUpdate(): void;
  quitAndInstall(): void;
}

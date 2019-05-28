import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/interfaces/config.service';
import { ConfigOptions } from 'src/config/config';

@Injectable()
export class LocalStorageConfigService implements ConfigService {

  constructor() {
    if (localStorage && !localStorage.getItem('config')) {
      localStorage.setItem('config', JSON.stringify({}));
    }
  }

  save(config: ConfigOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      if (localStorage) {
        localStorage.setItem('config', JSON.stringify(config));
      } else {
        reject('localStorage is not available');
      }
    });
  }

  load(): Promise<ConfigOptions> {
    return new Promise((resolve, reject) => {
      if (localStorage) {
        resolve(JSON.parse(localStorage.getItem('config')));
      } else {
        reject('localStorage is not available');
      }
    });
  }
}

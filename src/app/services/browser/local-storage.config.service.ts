import { Injectable } from '@angular/core';
import { ConfigService } from '@interfaces/config.service';
import { ConfigOptions, defaultConfig } from '@config/config';

@Injectable()
export class LocalStorageConfigService implements ConfigService {

  constructor() {
    if (localStorage && !localStorage.getItem('config')) {
      localStorage.setItem('config', JSON.stringify(defaultConfig));
    }
  }

  save(config: ConfigOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      if (localStorage) {
        localStorage.setItem('config', JSON.stringify(config));
        resolve(null);
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

import { InjectionToken } from '@angular/core';
import { ConfigOptions } from '@config/config';

export const ConfigServiceToken = new InjectionToken('config-service');

export interface ConfigService {
  save(config: ConfigOptions): Promise<any>;
  load(): Promise<ConfigOptions>;
}

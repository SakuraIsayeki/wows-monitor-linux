import { InjectionToken } from '@angular/core';

export const LoggerServiceToken = new InjectionToken('logger-service');

export interface LoggerService {
  debug(...args: any[]);
  error(...args: any[]);
}

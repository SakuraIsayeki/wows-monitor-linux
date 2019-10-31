import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const SignalrServiceToken = new InjectionToken('signalr-service');

export interface SignalrService {
  $socketStatus: Observable<SignalrStatus>;
  $status: Observable<Status>;
  $info: Observable<any>;
  $error: Observable<string>;
  $clients: Observable<number>;

  connect(): Promise<any>;
  init(): Promise<any>;
  resetInfo();
}

export enum SignalrStatus {
  Disconnected,
  Connected,
  NoToken,
  HostDisconnected,
  None
}

export enum Status {
  Idle = 1,
  Fetching = 2,
  Fetched = 3
}

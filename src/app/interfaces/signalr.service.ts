import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const SignalrServiceToken = new InjectionToken('signalr-service');

export interface SignalrService {
  $socketStatus: Observable<SignalrStatus>;
  $status: Observable<Status>;
  $info: Observable<any>;
  $clients: Observable<number>;

  connect(): Promise<any>;
  init(): Promise<any>;
}

export enum SignalrStatus {
  Disconnected,
  Connected,
  NoToken
}

export enum Status {
  Idle,
  Fetching,
  Fetched
}

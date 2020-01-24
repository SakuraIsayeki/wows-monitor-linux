import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { LivefeedItem } from './livefeed-item';

export const SignalrServiceToken = new InjectionToken('signalr-service');

export interface SignalrService {
  $socketStatus: Observable<SignalrStatus>;
  $status: Observable<Status>;
  $info: Observable<any>;
  $error: Observable<string>;
  $clients: Observable<number>;

  $livefeedUpdate: Observable<LivefeedItem[]>;

  connect(): Promise<any>;
  init(): Promise<any>;
  sendSettings(settings: SignalrSettings): Promise<void>;
  resetInfo();
}

export enum SignalrStatus {
  Disconnected,
  Connected,
  NoToken,
  HostDisconnected,
  None,
  HostConnected
}

export enum Status {
  Idle = 1,
  Fetching = 2,
  Fetched = 3
}

export interface SignalrSettings {
  token?: string,
  liveUpdate?: boolean;
}

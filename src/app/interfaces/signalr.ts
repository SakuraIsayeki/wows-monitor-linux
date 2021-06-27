import { InjectionToken } from '@angular/core';

export const SignalrServiceToken = new InjectionToken('signalr-service');

export enum SignalrStatus {
  Disconnected,
  Connected,
  NoToken,
  HostDisconnected,
  None,
  HostConnected,
  Reconnecting
}

export enum Status {
  Idle = 1,
  Fetching = 2,
  Fetched = 3
}

export interface SignalrSettings {
  token?: string;
  liveUpdate?: boolean;
  sendToken?: boolean;
}

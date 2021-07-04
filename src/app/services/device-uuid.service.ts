import { Injectable, InjectionToken } from '@angular/core';

export const DeviceUuidServiceToken = new InjectionToken('device-uuid-service');

export interface DeviceUuidService {

  getUuid(): string;
}

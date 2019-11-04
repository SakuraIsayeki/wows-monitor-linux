import { InjectionToken } from '@angular/core';

export const AnalyticsServiceToken = new InjectionToken('analytics-service');

export interface AnalyticsService {

  config(path: string, title?: string);

  send(
    eventName: string,
    eventCategory: string,
    eventAction: string,
    eventLabel?: string,
    eventValue?: string);
}
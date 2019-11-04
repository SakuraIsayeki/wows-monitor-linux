import { Injectable } from '@angular/core';
import { AnalyticsService } from '../interfaces/analytics.service';

declare let gtag: Function;
const trackingId = 'UA-151253199-2';

@Injectable()
export class GoogleAnalyticsService implements AnalyticsService {

  public config(path: string, title?: string) {
    gtag('config', trackingId, {
      'page_title': title,
      'page_path': path
    })
  }

  public send(
    eventName: string,
    eventCategory: string,
    eventAction: string,
    eventLabel?: string,
    eventValue?: number) {
    gtag('event', eventName, {
      eventCategory: eventCategory,
      eventLabel: eventLabel,
      eventAction: eventAction,
      eventValue: eventValue
    })
  }
}
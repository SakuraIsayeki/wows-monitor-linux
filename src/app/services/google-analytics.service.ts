import { Injectable } from '@angular/core';

declare let gtag: Function;
const trackingId = 'UA-151253199-2';

@Injectable()
export class GoogleAnalyticsService {

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
    eventLabel: string = null,
    eventValue: string = null) {
    gtag('event', eventName, {
      eventCategory: eventCategory,
      eventLabel: eventLabel,
      eventAction: eventAction,
      eventValue: eventValue
    })
  }
}
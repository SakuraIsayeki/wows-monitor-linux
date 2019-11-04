import { Injectable } from '@angular/core';


@Injectable()
export class DummyAnalyticsService {

  public config(path: string, title?: string) {
    console.log(`[Analytics] (config) ${path}, ${title}`);
  }

  public send(
    eventName: string,
    eventCategory: string,
    eventAction: string,
    eventLabel: string = null,
    eventValue: string = null) {
    console.log(`[Analytics] (send) ${eventName}, ${eventCategory}, ${eventAction}, ${eventLabel}, ${eventValue}`);
  }
}
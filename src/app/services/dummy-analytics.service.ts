import { Injectable } from '@angular/core';
import { AnalyticsService } from '../interfaces/analytics.service';


@Injectable()
export class DummyAnalyticsService implements AnalyticsService {

  public config(path: string, title?: string) {
    console.log(`[Analytics] (config) ${path}, ${title}`);
  }

  public send(
    eventName: string,
    eventCategory: string,
    eventAction: string,
    eventLabel: string = null,
    eventValue: number = null) {
    console.log(`[Analytics] (send) ${eventName}, ${eventCategory}, ${eventAction}, ${eventLabel}, ${eventValue}`);
  }

  exception(error: string) {

  }
}

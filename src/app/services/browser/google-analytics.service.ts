import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { skipWhile, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AnalyticsService } from '../../interfaces/analytics.service';
import { Config } from 'src/config/config';

declare var gtag: any;

@Injectable()
export class BrowserGoogleAnalyticsService implements AnalyticsService {

  private interval: number;

  constructor(private appConfig: Config) { }

  config(path: string, title?: string) {
    interval(300).pipe(skipWhile(() => gtag === undefined), take(1)).subscribe(() => {

      if (this.interval) {
        window.clearInterval(this.interval);
      }

      gtag('config', environment.gaCode, {
        page_title: title,
        page_path: path,
        user_id: this.appConfig.signalRToken
      });

      this.interval = window.setInterval(() => {
        gtag('config', environment.gaCode, {
          page_title: title,
          page_path: path,
          user_id: this.appConfig.signalRToken
        });
      }, 30000);
    });
  }

  exception(error: string) {
    gtag('event', 'exception', {
      description: error,
      fatal: false
    });
  }

  send(
    eventName: string,
    eventCategory: string,
    eventAction: string,
    eventLabel?: string,
    eventValue?: number) {
    interval(300).pipe(skipWhile(() => gtag === undefined), take(1)).subscribe(() => {
      gtag('event', eventName, {
        eventCategory,
        eventLabel,
        eventAction,
        eventValue
      });
    });
  }
}

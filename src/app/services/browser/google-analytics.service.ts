import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { skipWhile, take } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { AnalyticsService } from '@interfaces/analytics.service';
import { Config } from '@config/config';

declare var gtag: any;

@Injectable()
export class BrowserGoogleAnalyticsService implements AnalyticsService {

  constructor(private appConfig: Config) {
    interval(90000).pipe(skipWhile(() => gtag === undefined && !this.appConfig.enableAnalytics)).subscribe(() => {
      this.send('heartbeat', 'heartbeat', 'heartbeat', 'heartbeat');
    });
  }

  config(path: string, title?: string) {
    if (!this.appConfig.enableAnalytics) {
      return;
    }
    interval(300).pipe(skipWhile(() => gtag === undefined), take(1)).subscribe(() => {
      gtag('config', environment.gaCode, {
        page_title: title,
        page_path: path,
        user_id: this.appConfig.signalRToken,
        anonymize_ip: this.appConfig.anonymIp
      });
    });
  }

  exception(error: string) {
    if (!this.appConfig.enableAnalytics) {
      return;
    }
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
    if (!this.appConfig.enableAnalytics) {
      return;
    }
    interval(300).pipe(skipWhile(() => gtag === undefined), take(1)).subscribe(() => {
      gtag('event', eventName, {
        event_category: eventCategory,
        event_label: eventLabel,
        event_action: eventAction,
        value: eventValue,
        anonymize_ip: this.appConfig.anonymIp
      });
    });
  }
}

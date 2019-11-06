import { Injectable } from '@angular/core';
import { AnalyticsService } from '../interfaces/analytics.service';
import { environment } from 'src/environments/environment';
import { interval } from 'rxjs';
import { skipWhile, take } from 'rxjs/operators';

declare var gtag: any;

@Injectable()
export class GoogleAnalyticsService implements AnalyticsService {

  config(path: string, title?: string) {
    interval(300).pipe(skipWhile(() => gtag === undefined), take(1)).subscribe(() => {
      gtag('config', environment.gaCode, {
        page_title: title,
        page_path: path
      });
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

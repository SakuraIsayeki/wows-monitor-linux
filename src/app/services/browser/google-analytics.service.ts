import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { AnalyticsService } from '@interfaces/analytics.service';
import { SettingsService } from '@services/settings.service';
import { interval } from 'rxjs';
import { skipWhile, take } from 'rxjs/operators';

declare var gtag: any;

@Injectable()
export class BrowserGoogleAnalyticsService implements AnalyticsService {

  constructor(private settingsService: SettingsService) {
    interval(90000).pipe(skipWhile(() => gtag === undefined && !this.settingsService.form.monitorConfig.enableAnalytics.value)).subscribe(() => {
      this.send('heartbeat', 'heartbeat', 'heartbeat', 'heartbeat');
    });
  }

  config(path: string, title?: string) {
    if (!this.settingsService.form.monitorConfig.enableAnalytics.value) {
      return;
    }
    interval(300).pipe(skipWhile(() => gtag === undefined), take(1)).subscribe(() => {
      gtag('config', environment.gaCode, {
        page_title: title,
        page_path: path,
        user_id: this.settingsService.form.signalRToken.value,
        anonymize_ip: this.settingsService.form.monitorConfig.anonymIp.value
      });
    });
  }

  exception(error: string) {
    if (!this.settingsService.form.monitorConfig.enableAnalytics.value) {
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
    if (!this.settingsService.form.monitorConfig.enableAnalytics.value) {
      return;
    }
    interval(300).pipe(skipWhile(() => gtag === undefined), take(1)).subscribe(() => {
      gtag('event', eventName, {
        event_category: eventCategory,
        event_label: eventLabel,
        event_action: eventAction,
        value: eventValue,
        anonymize_ip: this.settingsService.form.monitorConfig.anonymIp.value
      });
    });
  }
}

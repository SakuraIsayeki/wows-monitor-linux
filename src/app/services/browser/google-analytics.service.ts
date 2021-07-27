import { Inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { AnalyticsService } from '@interfaces/analytics.service';
import { JwtAuthService } from '@services/jwt-auth.service';
import { SettingsService } from '@services/settings.service';
import { AUTHSERVICETOKEN } from '@stewie/framework';
import { interval, of } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { filter, skipWhile, startWith, switchMap, take } from 'rxjs/operators';

declare var gtag: any;

@Injectable()
export class BrowserGoogleAnalyticsService implements AnalyticsService {

  private gtagDefined = () => {
    if (window['gtag'] !== undefined) {
      return of(1).pipe(take(1));
    }
    return interval(300).pipe(skipWhile(() => window['gtag'] === undefined), take(1));
  };

  constructor(private settingsService: SettingsService,
              @Inject(AUTHSERVICETOKEN) private authService: JwtAuthService) {
    fromPromise(this.settingsService.waitForInitialized()).pipe(
      switchMap(() => interval(90000).pipe(skipWhile(() => window['gtag'] === undefined)))
    ).subscribe(() => {
      if(this.settingsService.form.monitorConfig.enableAnalytics.value){
        this.send('heartbeat', 'heartbeat', 'heartbeat', 'heartbeat');
      }
    });
  }

  config(path: string, title?: string) {
    if (!this.settingsService.form.monitorConfig.enableAnalytics.value) {
      return;
    }
    this.gtagDefined().subscribe(() => {
      gtag('config', environment.gaCode, {
        page_title: title,
        page_path: path,
        user_id: this.authService.userInfo.uuid ?? this.settingsService.form.uuid.value,
        anonymize_ip: this.settingsService.form.monitorConfig.anonymIp.value
      });
    });
  }

  exception(error: string) {
    if (!this.settingsService.form.monitorConfig.enableAnalytics.value) {
      return;
    }
    this.gtagDefined().subscribe(() => {
      gtag('event', 'exception', {
        description: error,
        fatal: false
      });
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
    this.gtagDefined().subscribe(() => {
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

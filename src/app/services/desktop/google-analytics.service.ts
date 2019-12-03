import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { skipWhile, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AnalyticsService } from '../../interfaces/analytics.service';
import ua from 'universal-analytics';
import { appConfig } from 'src/config/app.config';

@Injectable()
export class DesktopGoogleAnalyticsService implements AnalyticsService {

  private visitor: ua.visitor;

  
  constructor() {
    this.visitor = ua(environment.gaCode);
  }

  config(path: string, title?: string) {
    this.visitor.screenview(title, appConfig.applicationName, appConfig.version).send();
  }

  send(
    eventName: string,
    eventCategory: string,
    eventAction: string,
    eventLabel?: string,
    eventValue?: number) {
    this.visitor.event(eventCategory, eventAction, eventLabel, eventValue).send();
  }
}

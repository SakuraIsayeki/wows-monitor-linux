import { Injectable } from '@angular/core';
import { appConfig } from 'src/config/app.config';
import { environment } from 'src/environments/environment';
import ua from 'universal-analytics';
import { AnalyticsService } from '../../interfaces/analytics.service';
import { Config } from 'src/config/config';

@Injectable()
export class DesktopGoogleAnalyticsService implements AnalyticsService {

  private visitor: ua.visitor;


  constructor(config: Config) {
    config.waitTillLoaded().then(() => this.visitor = ua(environment.gaCode, config.uuid));
  }

  config(path: string, title?: string) {
    if (!this.visitor) { return; }
    this.visitor.screenview(path, appConfig.applicationName, appConfig.version, err => {
      console.log(err);
    }).send();
  }

  send(
    eventName: string,
    eventCategory: string,
    eventAction: string,
    eventLabel?: string,
    eventValue?: number) {
    if (!this.visitor) { return; }
    this.visitor.event(eventCategory, eventAction, eventLabel, eventValue).send();
  }
}

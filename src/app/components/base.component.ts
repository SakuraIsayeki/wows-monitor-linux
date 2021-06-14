import { Component, NgZone, OnDestroy } from '@angular/core';
import { environment } from '@environments/environment';
import { AnalyticsService, AnalyticsServiceToken } from '@interfaces/analytics.service';
import { LoggerService, LoggerServiceToken } from '@interfaces/logger.service';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent as StBaseComponent, LocatorService } from '@stewie/framework';

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
  template: ''
})
export class BaseComponent extends StBaseComponent implements OnDestroy {

  private loggerService: LoggerService;

  ngZone: NgZone;
  translateService: TranslateService;
  analyticsService: AnalyticsService;

  constructor() {
    super();
    this.ngZone = LocatorService.Injector.get(NgZone);
    this.loggerService = LocatorService.Injector.get(LoggerServiceToken) as LoggerService;
    this.translateService = LocatorService.Injector.get(TranslateService) as TranslateService;
    this.analyticsService = LocatorService.Injector.get(AnalyticsServiceToken) as AnalyticsService;
  }

  get isDesktop() {
    return environment.desktop;
  }

  get isBrowserApp() {
    return environment.browser;
  }

  get isProduction() {
    return environment.production;
  }

  logDebug(...args: any[]) {
    this.loggerService.debug(...args);
  }

  logError(...args: any[]) {
    this.loggerService.error(...args);
  }
}

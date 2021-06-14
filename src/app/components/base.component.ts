import { ApplicationRef, Component, NgZone, OnDestroy } from '@angular/core';
import { environment } from '@environments/environment';
import { AnalyticsService, AnalyticsServiceToken } from '@interfaces/analytics.service';
import { LoggerService, LoggerServiceToken } from '@interfaces/logger.service';
import { TranslateService } from '@ngx-translate/core';
import { LocatorService } from '@services/locator.service';
import { Message, MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';

export class BaseInjection {

  private messageService: MessageService;

  constructor() {
    this.messageService = LocatorService.Injector.get(MessageService);
  }

  uiSuccess(messageKey: string) {
    this.messageService.add({
      closable: false,
      life: 3000,
      severity: 'c-success',
      summary: 'uiMessages.summaries.success',
      detail: `uiMessages.messages.${messageKey}`
    });
  }

  uiWarn(messageKey: string) {
    this.messageService.add({
      closable: false,
      life: 3000,
      severity: 'c-warn',
      summary: 'uiMessages.summaries.warn',
      detail: `uiMessages.messages.${messageKey}`
    });
  }

  uiError(messageKey: string) {
    this.messageService.add({
      closable: false,
      life: 3000,
      severity: 'c-error',
      summary: 'uiMessages.summaries.error',
      detail: `uiMessages.messages.${messageKey}`
    });
  }

  uiCustom(message: Message) {
    this.messageService.add(message);
  }
}

@Component({
  template: ''
})
export class BaseComponent extends BaseInjection implements OnDestroy {

  private appRef: ApplicationRef;
  private loggerService: LoggerService;
  private ngUnsubscribe = new Subject();

  ngZone: NgZone;
  translateService: TranslateService;
  analyticsService: AnalyticsService;

  constructor() {
    super();
    this.appRef = LocatorService.Injector.get(ApplicationRef);
    this.ngZone = LocatorService.Injector.get(NgZone);
    this.loggerService = LocatorService.Injector.get(LoggerServiceToken) as LoggerService;
    this.translateService = LocatorService.Injector.get(TranslateService) as TranslateService;
    this.analyticsService = LocatorService.Injector.get(AnalyticsServiceToken) as AnalyticsService;
  }

  get isStable(): Observable<boolean> {
    return this.appRef.isStable.pipe(filter(stable => stable), take(1), this.untilDestroy());
  }

  get isDesktop() {
    return environment.desktop;
  }

  get isBrowser() {
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

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  untilDestroy = <T>() => takeUntil<T>(this.ngUnsubscribe);
}

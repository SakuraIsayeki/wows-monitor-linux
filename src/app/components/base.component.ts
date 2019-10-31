import { ApplicationRef, NgZone, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LocatorService } from '../services/locator.service';
import { LoggerService, LoggerServiceToken } from '../interfaces/logger.service';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

export class BaseComponent implements OnDestroy {

  private appRef: ApplicationRef;
  private messageService: MessageService;
  private loggerService: LoggerService;
  private ngUnsubscribe = new Subject();

  ngZone: NgZone;
  translateService: TranslateService;

  constructor() {
    this.appRef = LocatorService.Injector.get(ApplicationRef);
    this.ngZone = LocatorService.Injector.get(NgZone);
    this.loggerService = LocatorService.Injector.get(LoggerServiceToken) as LoggerService;
    this.translateService = LocatorService.Injector.get(TranslateService) as TranslateService;
    this.messageService = LocatorService.Injector.get(MessageService);
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
    if (!environment.production) {
      this.loggerService.debug(...args);
    }
  }

  logError(...args: any[]) {
    this.loggerService.error(...args);
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

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  untilDestroy = <T>() => takeUntil<T>(this.ngUnsubscribe);
}

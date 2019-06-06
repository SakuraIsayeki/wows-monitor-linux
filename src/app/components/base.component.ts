import { ApplicationRef, NgZone, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LocatorService } from '../services/locator.service';
import { LoggerService, LoggerServiceToken } from '../interfaces/logger.service';

export class BaseComponent implements OnDestroy {

  private appRef: ApplicationRef;
  private loggerService: LoggerService;
  private ngUnsubscribe = new Subject();

  ngZone: NgZone;

  constructor() {
    this.appRef = LocatorService.Injector.get(ApplicationRef);
    this.ngZone = LocatorService.Injector.get(NgZone);
    this.loggerService = LocatorService.Injector.get(LoggerServiceToken) as LoggerService;
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

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  untilDestroy = <T>() => takeUntil<T>(this.ngUnsubscribe);
}

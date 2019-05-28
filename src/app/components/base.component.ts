import { ApplicationRef, NgZone, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LocatorService } from '../services/locator.service';
import { LoggerService, LoggerServiceToken } from '../interfaces/logger.service';

export class BaseComponent implements OnDestroy {

  private ngUnsubscribe = new Subject();
  private appRef: ApplicationRef;
  private loggerService: LoggerService;

  public ngZone: NgZone;

  constructor() {
    this.appRef = LocatorService.Injector.get(ApplicationRef);
    this.ngZone = LocatorService.Injector.get(NgZone);
    this.loggerService = LocatorService.Injector.get(LoggerServiceToken) as LoggerService;
  }

  public untilDestroy = <T>() => takeUntil<T>(this.ngUnsubscribe);

  public get isStable(): Observable<boolean> {
    return this.appRef.isStable.pipe(filter(stable => stable), take(1), this.untilDestroy());
  }

  public get isDesktop() {
    return environment.desktop;
  }

  public get isBrowser() {
    return environment.browser;
  }

  public get isProduction() {
    return environment.production;
  }

  public logDebug(...args: any[]) {
    if (!environment.production) {
      this.loggerService.debug(...args);
    }
  }

  public logError(...args: any[]) {
    this.loggerService.error(...args);
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

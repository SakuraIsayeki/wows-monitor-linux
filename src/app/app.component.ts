import { Component, Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, NavigationEnd, RouterStateSnapshot } from '@angular/router';
import { BaseComponent } from '@components/base.component';
import { environment } from '@environments/environment';
import { ElectronService, ElectronServiceToken } from '@interfaces/electron.service';
import { UpdateService, UpdateServiceToken } from '@interfaces/update.service';
import { TranslateService } from '@ngx-translate/core';
import { AppInitService } from '@services/app-init.service';
import { SettingsService } from '@services/settings.service';
import { AUTHSERVICETOKEN } from '@stewie/framework';
import { AuthService } from '@stewie/framework/lib/auth/auth.service';
import { PrimeNGConfig } from 'primeng/api';
import { forkJoin, interval, Observable, of } from 'rxjs';
import { first, map, skip, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app-wrapper.component.html'
})
export class AppWrapperComponent extends BaseComponent {

  public isUpdating = false;
  public showReset = false;

  get updateProgress() {
    if (environment.browser) {
      return of(100);
    } else {
      return this.updateService.$updateProgress;
    }
  }

  constructor(public appInit: AppInitService,
              private translate: TranslateService,
              public settingsService: SettingsService,
              @Inject(ElectronServiceToken) private electronService: ElectronService,
              @Inject(UpdateServiceToken) private updateService: UpdateService) {
    super();
  }

  ngOnInit() {
    this.translate.addLangs(['en']);
    this.translate.setDefaultLang('en');
    this.translate.use(this.translate.getBrowserLang());

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.analyticsService.config(event.urlAfterRedirects);
      }
    });

    if (environment.desktop) {
      this.updateService.$updateAvailable.pipe(this.untilDestroy(), skip(1)).subscribe(available => this.handleUpdate(available));
      this.updateService.checkForUpdate();
    } else {
      this.appInit.initialized();
    }

    interval(10000).pipe(this.untilDestroy(), take(1)).subscribe(() => {
      this.showReset = true;
    });
  }

  private handleUpdate(available) {
    if (available) {
      this.ngZone.run(() => {
        this.isUpdating = true;
      });
      setTimeout(() => this.updateService.quitAndInstall(), 2000);
    } else {
      this.ngZone.run(() => {
        this.appInit.initialized();
      });
    }
  }

  async resetAndRestart() {
    await this.settingsService.reset();
    await this.electronService.ipcRenderer.invoke('restart');
  }
}

@Component({
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(public wrapper: AppWrapperComponent) {

  }

  ngOnInit() {

  }
}

@Injectable()
export class AppActivator implements CanActivate, CanActivateChild {

  constructor(private primeNgConfig: PrimeNGConfig,
              private translate: TranslateService,
              private appInit: AppInitService,
              private settingsService: SettingsService,
              @Inject(AUTHSERVICETOKEN) private authService: AuthService
  ) {

  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.activate();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.activate();
  }

  private activate() {
    return forkJoin([
      this.appInit.isInitialized$.pipe(first(x => x)),
      this.translate.use(this.translate.getBrowserLang()),
      this.settingsService.initialize(),
      this.authService.isLoaded$.pipe(first(v => v))
    ])
      .pipe(map(v => true), tap(() => {
        this.translate.get('primeng').subscribe(res => this.primeNgConfig.setTranslation(res));
      }));
  }
}

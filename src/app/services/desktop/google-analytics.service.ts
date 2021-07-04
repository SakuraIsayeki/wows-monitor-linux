import { Inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { staticValues } from '@environments/static-values';
import { AnalyticsService } from '@interfaces/analytics.service';
import { ElectronService, ElectronServiceToken } from '@interfaces/electron.service';
import { JwtAuthService } from '@services/jwt-auth.service';
import { SettingsService } from '@services/settings.service';
import { AUTHSERVICETOKEN } from '@stewie/framework';
import { interval } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { switchMap, tap } from 'rxjs/operators';
import ua from 'universal-analytics';

declare type ScreenInfo = {
  sizeX: number;
  sizeY: number;
  displayWidth: number;
  displayHeight: number;
};

@Injectable()
export class DesktopGoogleAnalyticsService implements AnalyticsService {

  private visitor: ua.visitor;

  constructor(private settingsService: SettingsService,
              @Inject(ElectronServiceToken) private electronService: ElectronService,
              @Inject(AUTHSERVICETOKEN) private authService: JwtAuthService) {
    fromPromise(this.settingsService.waitForInitialized()).pipe(
      switchMap(() => this.authService.userInfo$),
      tap(userInfo => {
        this.visitor = ua(environment.gaCode, userInfo.uuid ?? this.settingsService.form.uuid.value);
      }),
      switchMap(() => interval(1000))
    ).subscribe(() => {
      this.send('heartbeat', 'heartbeat', 'heartbeat', 'heartbeat');
    });
  }

  async config(path: string, title?: string) {
    if (!this.visitor) {
      return;
    }

    const screenInfo: ScreenInfo = await this.electronService.ipcRenderer.invoke('get-window-and-screen-info');
    const params = {
      sr: `${screenInfo.sizeX}x${screenInfo.sizeY}`,
      vp: `${screenInfo.displayWidth}x${screenInfo.displayHeight}`
    } as any;
    if (this.settingsService.form.monitorConfig.anonymIp.value) {
      params.aip = 1;
    }

    this.visitor
      .screenview(path, staticValues.applicationName, staticValues.version, staticValues.version, staticValues.version, params, () => {
      }).send();
  }

  exception(error: string) {
    if (!this.visitor) {
      return;
    }
    const params = {
      exd: error
    } as any;

    if (this.settingsService.form.monitorConfig.anonymIp.value) {
      params.aip = 1;
    }
    this.visitor.exception(params);
  }

  send(
    eventName: string,
    eventCategory: string,
    eventAction: string,
    eventLabel?: string,
    eventValue?: number) {
    if (!this.visitor) {
      return;
    }
    const params = {} as any;
    if (this.settingsService.form.monitorConfig.anonymIp.value) {
      params.aip = 1;
    }
    this.visitor.event(eventCategory, eventAction, eventLabel, eventValue, params, null).send();
  }
}

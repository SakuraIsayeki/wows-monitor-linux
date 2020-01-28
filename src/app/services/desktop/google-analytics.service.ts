import { Injectable } from '@angular/core';
import { appConfig } from 'src/config/app.config';
import { Config } from 'src/config/config';
import { environment } from 'src/environments/environment';
import ua from 'universal-analytics';
import { AnalyticsService } from '../../interfaces/analytics.service';
import { ElectronService } from './electron.service';

@Injectable()
export class DesktopGoogleAnalyticsService implements AnalyticsService {

  private visitor: ua.visitor;
  private interval: NodeJS.Timeout;

  constructor(private _config: Config, private electronService: ElectronService) {
    _config.waitTillLoaded().then(() => {
      this.visitor = ua(environment.gaCode, _config.uuid);
      setInterval(() => this.send('heartbeat', 'heartbeat', 'heartbeat', 'heartbeat'), 90000);
    });
  }

  config(path: string, title?: string) {
    if (!this.visitor) { return; }
    const window = this.electronService.remote.BrowserWindow.getAllWindows()[0];
    const screen = this.electronService.remote.screen;
    const windowSize = window.getSize();
    const windowBounds = window.getBounds();
    const display = screen.getDisplayNearestPoint({ x: windowBounds.x, y: windowBounds.y });
    const params = {
      sr: `${windowSize[0]}x${windowSize[1]}`,
      vp: `${display.size.width}x${display.size.height}`
    } as any;
    if (this._config.anonymIp) {
      params.aip = 1;
    }

    this.visitor
      .screenview(path, appConfig.applicationName, appConfig.version, appConfig.version, appConfig.version, params, () => { }).send();
  }

  exception(error: string) {
    if (!this.visitor) { return; }
    const params = {
      exd: error
    } as any;

    if (this._config.anonymIp) {
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
    if (!this.visitor) { return; }
    const params = {} as any;
    if (this._config.anonymIp) {
      params.aip = 1;
    }
    this.visitor.event(eventCategory, eventAction, eventLabel, eventValue, params, null).send();
  }
}

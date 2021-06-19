import { Inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { staticValues } from '@environments/static-values';
import { LoggerService, LoggerServiceToken } from '@interfaces/logger.service';
import { SignalrSettings, SignalrStatus, Status } from '@interfaces/signalr';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { SettingsService } from '@services/settings.service';
import { BaseInjection } from '@stewie/framework';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { LivefeedItem, MatchInfo } from '../generated/models';
import { QrService } from '../generated/services';

@Injectable()
export class SignalrService extends BaseInjection {

  private connection: HubConnection;
  private _settings: SignalrSettings;
  private _$socketStatus = new BehaviorSubject<SignalrStatus>(SignalrStatus.None);
  private _$status = new BehaviorSubject<Status>(Status.Idle);
  private _$info = new BehaviorSubject<MatchInfo>(null);
  private _$error = new Subject<string>();
  private _$clients = new BehaviorSubject<number>(0);
  private _$livefeedUpdate = new BehaviorSubject<LivefeedItem[]>([]);


  get $socketStatus(): Observable<SignalrStatus> {
    return this._$socketStatus.asObservable();
  }

  get $status(): Observable<Status> {
    return this._$status.asObservable();
  }

  get $info(): Observable<MatchInfo> {
    return this._$info.asObservable();
  }

  get $error(): Observable<string> {
    return this._$error.asObservable();
  }

  get $clients(): Observable<number> {
    if (environment.browser) {
      throw new Error('Only the desktop client can be the host and get his client count');
    }
    return this._$clients.asObservable();
  }

  get $livefeedUpdate(): Observable<LivefeedItem[]> {
    return this._$livefeedUpdate.asObservable();
  }

  constructor(
    private settingsService: SettingsService,
    @Inject(LoggerServiceToken) private loggerService: LoggerService,
    private qrService: QrService
  ) {
    super();
  }

  async init() {

    // Url Param Testing
    const url = environment.apiUrl + staticValues.hub + '?host=' + (environment.desktop ? 'true' : 'false');
    await this.settingsService.waitForInitialized();
    let token = this.settingsService.form.signalRToken.model;
    if (!token) {
      if (environment.desktop) {
        token = await this.qrService.qrToken().toPromise();
        this.settingsService.form.signalRToken.setValue(token);
      }
    }

    this._settings = {
      token: this.settingsService.form.signalRToken.model,
      liveUpdate: this.settingsService.form.livefeedConfig.liveUpdate.model
    };

    this.connection = new HubConnectionBuilder()
      .withUrl(url)
      .configureLogging(environment.production ? LogLevel.Error : LogLevel.Trace)
      .build();

    this.connection.on('UpdateStatus', (status) => {
      this._$status.next(status === 'fetching' ? Status.Fetching : Status.Idle);
    });

    this.connection.on('UpdateInfo', (info) => {
      this.uiSuccess('matchUpdated');
      this._$status.next(Status.Fetched);
      this._$info.next(info);
    });

    this.connection.on('RequestInfo', (targetConnectionId) => {
      this._$info.pipe(take(1), filter(info => info != null)).subscribe(info => {
        this.connection.invoke('SendInfoToClient', info, targetConnectionId);
      });
    });

    this.connection.on('UpdateClientCount', (clients) => {
      this._$clients.next(clients);
    });

    this.connection.on('Connected', () => {
      if (environment.desktop) {
        this._$socketStatus.next(SignalrStatus.Connected);
      } else {
        this._$socketStatus.next(this.settingsService.form.signalRToken.model ? SignalrStatus.HostDisconnected : SignalrStatus.NoToken);
      }
    });

    this.connection.on('HostConnected', () => {
      this._$socketStatus.next(SignalrStatus.HostConnected);
      this.uiSuccess('hostConnected');
    });

    this.connection.on('HostDisconnected', () => {
      if (this._$socketStatus.value === SignalrStatus.HostConnected) {
        this.uiWarn('hostLost');
      } else {
        this.uiWarn('noHostPaired');
      }
      this._$socketStatus.next(SignalrStatus.HostDisconnected);
    });

    this.connection.on('SendError', (error) => {
      this.loggerService.error('Error in api', error);
      this._$error.next(error);
      this._$status.next(Status.Idle);
    });

    this.connection.on('LivefeedUpdate', (items: LivefeedItem[]) => {
      this._$livefeedUpdate.next(items);
    });

    this.connection.onclose(() => {
      this._$socketStatus.next(SignalrStatus.Disconnected);
      if (environment.production) {
        setTimeout(() => this.connect(), 2000);
      }
    });
  }

  connect(): Promise<any> {
    return new Promise((resolve) => {
      if (this.connection) {
        try {
          this.connection.start()
            .then(() => {
              this.sendSettings(this._settings);
              resolve(true);
            })
            .catch(() => {
              this.loggerService.error('Couldn\'t connect to the signalr hub');
              if (environment.production) {
                setTimeout(() => this.connect(), 2000);
              }
              resolve(false);
            });
        } catch (e) {

        }
      } else {
        this.loggerService.error('Connection not initialized');
        resolve(false);
      }
    });
  }

  disconnect() {
    return new Promise((resolve) => {
      if (this.connection) {
        try {
          this.connection.stop()
            .then(() => {
              resolve(true);
              this._$socketStatus.next(SignalrStatus.Disconnected);
            })
            .catch(() => {
              this.loggerService.error('Couldn\'t disconnect from the signalr hub');
              resolve(false);
            });
        } catch (e) {

        }
      } else {
        this.loggerService.error('Connection not initialized');
        resolve(false);
      }
    });
  }

  async sendSettings(settings?: SignalrSettings) {
    if (settings) {
      for (const key of Object.keys(settings)) {
        this._settings[key] = settings[key];
      }
    }
    await this.connection.send('SendSettings', { ...this._settings, sendToken: settings != null && settings.token != null });
  }

  resetInfo() {
    this._$status.next(Status.Idle);
    this._$info.next(null);
  }
}

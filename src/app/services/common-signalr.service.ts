import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { SignalrService, SignalrSettings, SignalrStatus, Status } from 'src/app/interfaces/signalr.service';
import { appConfig } from 'src/config/app.config';
import { Config } from 'src/config/config';
import { environment } from 'src/environments/environment';
import { BaseInjection } from '../components/base.component';
import { LivefeedItem, MatchInfo } from '../generated/models';
import { QrService } from '../generated/services';
import { LoggerService, LoggerServiceToken } from '../interfaces/logger.service';

@Injectable()
export class CommonSignalrService extends BaseInjection implements SignalrService {

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
    private config: Config,
    @Inject(LoggerServiceToken) private loggerService: LoggerService,
    private qrService: QrService
  ) {
    super();
  }

  async init() {

    // Url Param Testing
    let url = environment.apiUrl + appConfig.hub + '?host=' + (environment.desktop ? 'true' : 'false');
    await this.config.waitTillLoaded();
    let token = this.config.signalRToken;
    if (!token) {
      if (environment.desktop) {
        token = await this.qrService.qrToken().toPromise();
        this.config.signalRToken = token;
        this.config.save();
      }
    }

    this._settings = {
      token: this.config.signalRToken,
      liveUpdate: this.config.livefeedConfig.liveUpdate
    };

    this.connection = new HubConnectionBuilder()
      .withUrl(url)
      .configureLogging(environment.production ? LogLevel.Error : LogLevel.Trace)
      .build();

    this.connection.on('UpdateStatus', (status) => {
      this._$status.next(status === 'fetching' ? Status.Fetching : Status.Idle);
    });

    this.connection.on('UpdateInfo', (info) => {
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
        this._$socketStatus.next(this.config.signalRToken ? SignalrStatus.HostDisconnected : SignalrStatus.NoToken);
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

    this.connection.onclose((error) => {
      this._$socketStatus.next(SignalrStatus.Disconnected);
    });
  }

  connect(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.connection) {
        try {
          this.connection.start()
            .then(() => {
              this.sendSettings(this._settings);
              resolve(true);
            })
            .catch((error) => {
              this.loggerService.error('Couldn\'t connect to the signalr hub');
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
    return new Promise((resolve, reject) => {
      if (this.connection) {
        try {
          this.connection.stop()
            .then(() => {
              resolve(true);
              this._$socketStatus.next(SignalrStatus.Disconnected);
            })
            .catch((error) => {
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

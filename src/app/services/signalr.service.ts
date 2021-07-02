import { Inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { staticValues } from '@environments/static-values';
import { LoggerService, LoggerServiceToken } from '@interfaces/logger.service';
import { SignalrSettings, SignalrStatus, Status } from '@interfaces/signalr';
import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr';
import { ApiService } from '@services/api.service';
import { JwtAuthService } from '@services/jwt-auth.service';
import { SettingsService } from '@services/settings.service';
import { AUTHSERVICETOKEN, BaseInjection } from '@stewie/framework';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, pairwise, share, take } from 'rxjs/operators';
import { LivefeedAppModel, MatchAppModel } from '../generated/models';
import { QrService } from '../generated/services';

@Injectable()
export class SignalrService extends BaseInjection {

  private connection: HubConnection;
  private _settings: SignalrSettings;
  private _$gatewayStatus = new BehaviorSubject<SignalrStatus>(SignalrStatus.None);
  private _$status = new BehaviorSubject<Status>(Status.Idle);
  private _$info = new BehaviorSubject<MatchAppModel>(null);
  private _$error = new Subject<string>();
  private _$clients = new BehaviorSubject<number>(0);
  private _$livefeedUpdate = new BehaviorSubject<LivefeedAppModel[]>([]);


  get $gatewayStatus(): Observable<SignalrStatus> {
    return this._$gatewayStatus.asObservable();
  }

  get $status(): Observable<Status> {
    return this._$status.pipe(distinctUntilChanged(), share());
  }

  get $info(): Observable<MatchAppModel> {
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

  get $livefeedUpdate(): Observable<LivefeedAppModel[]> {
    return this._$livefeedUpdate.asObservable();
  }

  constructor(
    private settingsService: SettingsService,
    @Inject(LoggerServiceToken) private loggerService: LoggerService,
    private qrService: QrService,
    @Inject(AUTHSERVICETOKEN) private authService: JwtAuthService,
    private apiService: ApiService
  ) {
    super();
  }

  async init() {

    // Url Param Testing
    const url = environment.apiUrl + staticValues.hub + '?host=' + (environment.desktop ? 'true' : 'false');
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

    this.authService.isAuthenticated$.subscribe(() => {
      console.log('Authenticated SIGNALR');
      this.connect();
    });

    this.connection = new HubConnectionBuilder()
      .withUrl(url, { accessTokenFactory: () => this.authService.token })
      .withAutomaticReconnect([0, 2000, 10000, 30000, 60000, 120000, null])
      .configureLogging(environment.production ? LogLevel.Error : LogLevel.Trace)
      .build();

    this.connection.onreconnecting(() => {
      this._$gatewayStatus.next(SignalrStatus.Reconnecting);
    });

    this.connection.onreconnected(() => {
      if (environment.desktop) {
        this._$gatewayStatus.next(SignalrStatus.Connected);
      } else {
        this._$gatewayStatus.next(this.settingsService.form.signalRToken.model ? SignalrStatus.HostDisconnected : SignalrStatus.NoToken);
      }
    });

    this.connection.on('UpdateStatus', (status) => {
      this._$status.next(status);
    });

    this.connection.on('UpdateMatch', (info) => {
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
        this._$gatewayStatus.next(SignalrStatus.Connected);
      } else {
        this._$gatewayStatus.next(this.settingsService.form.signalRToken.model ? SignalrStatus.HostDisconnected : SignalrStatus.NoToken);
      }
    });

    this.connection.on('HostConnected', () => {
      this._$gatewayStatus.next(SignalrStatus.HostConnected);
      this.uiSuccess('hostConnected');
    });

    this.connection.on('HostDisconnected', () => {
      if (this._$gatewayStatus.value === SignalrStatus.HostConnected) {
        this.uiWarn('hostLost');
      } else {
        this.uiWarn('noHostPaired');
      }
      this._$gatewayStatus.next(SignalrStatus.HostDisconnected);
    });

    this.connection.on('SendError', (error) => {
      this.loggerService.error('Error in api', error);
      this._$error.next(error);
      this._$status.next(Status.Idle);
    });

    this.connection.on('LivefeedUpdate', (items: LivefeedAppModel[]) => {
      this._$livefeedUpdate.next(items);
    });

    this.connection.onclose(() => {
      this._$gatewayStatus.next(SignalrStatus.Disconnected);
    });

    this.$error.subscribe(error => {
      if (error.startsWith('apiError')) {
        this.uiError(error);
      } else {
        this.uiError('apiError.unknown');
      }
    });

    this.$gatewayStatus.pipe(pairwise()).subscribe(([prev, next]) => {
      if ((prev === SignalrStatus.Reconnecting && next === SignalrStatus.Connected)
        || (prev === SignalrStatus.Disconnected && next === SignalrStatus.Connected)) {
        this.apiService.resendState();
      }
    });

    if (environment.desktop) {
      this.$clients.pipe(pairwise(), distinctUntilChanged()).subscribe(nums => {
        if (nums[0] <= nums[1]) {
          this.uiSuccess('clientConnected');
        } else {
          this.uiWarn('clientDisconnected');
        }
      });
    }
  }

  async connect(): Promise<any> {
    if (this.connection) {
      try {
        if (this.connection.state !== HubConnectionState.Disconnected) {
          await this.connection.stop();
        }

        await this.connection.start();
        await this.sendSettings(this._settings);
      } catch (e) {
        this.uiError('noServiceConnection');
        this.loggerService.error('Couldn\'t connect to the signalr hub');
      }
    } else {
      this.loggerService.error('Connection not initialized');
    }
  }

  disconnect() {
    return new Promise((resolve) => {
      if (this.connection) {
        try {
          this.connection.stop()
            .then(() => {
              resolve(true);
              this._$gatewayStatus.next(SignalrStatus.Disconnected);
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

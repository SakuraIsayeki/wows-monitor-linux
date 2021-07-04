import { Inject, Injectable, NgZone } from '@angular/core';
import { environment } from '@environments/environment';
import { staticValues } from '@environments/static-values';
import { WebConnectService } from '@generated/services/web-connect.service';
import { LoggerService, LoggerServiceToken } from '@interfaces/logger.service';
import { SignalrSettings, SignalrStatus, Status } from '@interfaces/signalr';
import { ApiService } from '@services/api.service';
import { GatewayTokenService } from '@services/gateway-token.service';
import { JwtAuthService } from '@services/jwt-auth.service';
import { SettingsService } from '@services/settings.service';
import { AUTHSERVICETOKEN, BaseInjection } from '@stewie/framework';
import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from '@stewieoo/signalr';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, pairwise, share, take } from 'rxjs/operators';
import { GatewaySettings, LivefeedAppModel, MatchAppModel } from '../generated/models';

@Injectable()
export class GatewayService extends BaseInjection {

  private connection: HubConnection;
  private _settings: GatewaySettings;
  private _gatewayStatus$ = new BehaviorSubject<SignalrStatus>(SignalrStatus.None);
  private _status$ = new BehaviorSubject<Status>(Status.Idle);
  private _info$ = new BehaviorSubject<MatchAppModel>(null);
  private _clients$ = new BehaviorSubject<number>(null);
  private _matches$ = new BehaviorSubject<number>(null);
  private _error$ = new Subject<string>();
  private _livefeedUpdate$ = new BehaviorSubject<LivefeedAppModel[]>([]);

  get clients$(): Observable<number> {
    return this._clients$.asObservable();
  }
  get matches$(): Observable<number> {
    return this._matches$.asObservable();
  }

  get gatewayStatus$(): Observable<SignalrStatus> {
    return this._gatewayStatus$.asObservable();
  }

  get status$(): Observable<Status> {
    return this._status$.pipe(distinctUntilChanged(), share());
  }

  get info$(): Observable<MatchAppModel> {
    return this._info$.asObservable();
  }

  get error$(): Observable<string> {
    return this._error$.asObservable();
  }

  get livefeedUpdate$(): Observable<LivefeedAppModel[]> {
    return this._livefeedUpdate$.asObservable();
  }

  constructor(
    private settingsService: SettingsService,
    @Inject(LoggerServiceToken) private loggerService: LoggerService,
    private qrService: WebConnectService,
    @Inject(AUTHSERVICETOKEN) private authService: JwtAuthService,
    private apiService: ApiService,
    private gatewayTokenService: GatewayTokenService,
    private ngZone: NgZone
  ) {
    super();
  }

  async init() {

    // Url Param Testing
    const url = environment.apiUrl + staticValues.hub + '?host=' + (environment.desktop ? 'true' : 'false');

    this._settings = {
      liveUpdate: this.settingsService.form.livefeedConfig.liveUpdate.model
    };

    this.authService.isAuthenticated$.subscribe(() => {
      this.gatewayTokenService.setToken(null);
      this.connect();
    });

    this.gatewayTokenService.tokenChanged$.pipe(filter(t => t != null)).subscribe(() => {
      this.connect();
    });

    const logLevel = environment.production ? LogLevel.Error : LogLevel.Trace;

    this.connection = new HubConnectionBuilder()
      .withUrl(url, {
        accessTokenFactory: () => this.authService.token,
        gatewayTokenFactory: () => this.gatewayTokenService.getToken()
      })
      .withAutomaticReconnect([0, 2000, 10000, 30000, 60000, 120000, null])
      .configureLogging(logLevel)
      .build();

    this.connection.onreconnecting(() => {
      this.ngZone.run(() => {
        this._gatewayStatus$.next(SignalrStatus.Reconnecting);
      });
    });

    this.connection.onreconnected(() => {
      this.ngZone.run(() => {
        if (environment.desktop) {
          this._gatewayStatus$.next(SignalrStatus.Connected);
        } else {
          this._gatewayStatus$.next(this.settingsService.form.signalRToken.model ? SignalrStatus.HostDisconnected : SignalrStatus.NoToken);
        }
      });
    });

    this.connection.on('OverallClientCount', (count) => {
      this.ngZone.run(() => {
        this._clients$.next(count);
      });
    });

    this.connection.on('MatchCount', (count) => {
      this.ngZone.run(() => {
        this._matches$.next(count);
      });
    });

    this.connection.on('UpdateStatus', (status) => {
      this.ngZone.run(() => {
        this._status$.next(status);
      });
    });


    this.connection.on('UpdateMatch', (info) => {
      this.ngZone.run(() => {
        this.uiSuccess('matchUpdated');
        this._status$.next(Status.Fetched);
        this._info$.next(info);
        if (environment.desktop) {
          this.connection.invoke('SendInfoToClients', info);
        }
      });

    });

    this.connection.on('RequestInfo', () => {
      this._info$.pipe(take(1), filter(info => info != null)).subscribe(info => {
        this.connection.invoke('SendInfoToClients', info);
      });
    });

    this.connection.on('ClientConnected', () => {
      this.ngZone.run(() => {
        this.uiSuccess('clientConnected');
      });
    });


    this.connection.on('ClientDisconnected', () => {
      this.ngZone.run(() => {
        this.uiWarn('clientDisconnected');
      });
    });

    this.connection.on('Connected', () => {
      this.ngZone.run(() => {
      });
      if (environment.desktop) {
        this._gatewayStatus$.next(SignalrStatus.Connected);
      } else {
        this._gatewayStatus$.next(this.settingsService.form.signalRToken.model ? SignalrStatus.HostDisconnected : SignalrStatus.NoToken);
      }
    });

    this.connection.on('HostConnected', () => {
      this.ngZone.run(() => {
        this._gatewayStatus$.next(SignalrStatus.HostConnected);
        this.uiSuccess('hostConnected');
        console.log('HostConnected');
      });
    });

    this.connection.on('HostDisconnected', () => {
      this.ngZone.run(() => {
        if (this._gatewayStatus$.value === SignalrStatus.HostConnected) {
          this.uiWarn('hostLost');
        } else {
          this.uiWarn('noHostPaired');
        }
        console.log('HostDisconnected');
        this._gatewayStatus$.next(SignalrStatus.HostDisconnected);
      });
    });

    this.connection.on('SendError', (error) => {
      this.ngZone.run(() => {
        this.loggerService.error('Error in api', error);
        this._error$.next(error);
        this._status$.next(Status.Idle);
      });
    });

    this.connection.on('LivefeedUpdate', (items: LivefeedAppModel[]) => {
      this.ngZone.run(() => {
        this._livefeedUpdate$.next(items);
      });
    });

    this.connection.onclose(() => {
      this.ngZone.run(() => {
        this._gatewayStatus$.next(SignalrStatus.Disconnected);
      });

    });

    this.error$.subscribe(error => {
      if (error.startsWith('apiError')) {
        this.uiError(error);
      } else {
        this.uiError('apiError.unknown');
      }
    });

    this.gatewayStatus$.pipe(pairwise()).subscribe(([prev, next]) => {
      if ((prev === SignalrStatus.Reconnecting && next === SignalrStatus.Connected)
        || (prev === SignalrStatus.Disconnected && next === SignalrStatus.Connected)) {
        if (this._info$.value == null) {
          this.apiService.resendState();
        }
      }
    });
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
              this._gatewayStatus$.next(SignalrStatus.Disconnected);
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
    this._status$.next(Status.Idle);
    this._info$.next(null);
  }
}

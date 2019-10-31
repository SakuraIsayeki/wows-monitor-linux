import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { SignalrService, SignalrStatus, Status } from 'src/app/interfaces/signalr.service';
import { appConfig } from 'src/config/app.config';
import { Config } from 'src/config/config';
import { environment } from 'src/environments/environment';
import { LoggerService, LoggerServiceToken } from '../interfaces/logger.service';
import { ApiService } from './api.service';

@Injectable()
export class CommonSignalrService implements SignalrService {

  private connection: HubConnection;
  private _$socketStatus = new BehaviorSubject<SignalrStatus>(SignalrStatus.None);
  private _$status = new BehaviorSubject<Status>(Status.Idle);
  private _$info = new BehaviorSubject<any>(null);
  private _$error = new Subject<string>();
  private _$clients = new BehaviorSubject<number>(0);


  get $socketStatus(): Observable<SignalrStatus> {
    return this._$socketStatus.asObservable();
  }

  get $status(): Observable<Status> {
    return this._$status.asObservable();
  }

  get $info(): Observable<any> {
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

  constructor(
    private config: Config,
    @Inject(LoggerServiceToken) private loggerService: LoggerService,
    private apiService: ApiService
  ) {
    this.init();
  }

  async init() {

    // Url Param Testing
    let url = environment.apiUrl + appConfig.hub;
    await this.config.waitTillLoaded();
    let token = this.config.signalRToken;
    if (!token) {
      if (environment.desktop) {
        token = await this.apiService.token().toPromise();
        this.config.signalRToken = token;
        this.config.save();
      } else {
        this._$socketStatus.next(SignalrStatus.NoToken);
      }
    }
    if (!token) {
      return;
    }

    url = url + '?token=' + token + '&host=' + (environment.desktop ? 'true' : 'false');

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

    this.connection.on('HostDisconnected', (clients) => {
      this.connection.stop();
      this._$socketStatus.next(SignalrStatus.HostDisconnected);
    });

    this.connection.on('SendError', (error) => {
      this.loggerService.error('Error in api', error);
      this._$error.next(error);
      this._$status.next(Status.Idle);
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
              resolve(true);
              this._$socketStatus.next(SignalrStatus.Connected);
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
              this._$socketStatus.next(SignalrStatus.Connected);
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

  resetInfo() {
    this._$status.next(Status.Idle);
    this._$info.next(null);
  }
}

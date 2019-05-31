import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConfigService, ConfigServiceToken } from 'src/app/interfaces/config.service';

export interface ConfigOptions {
  signalRToken: string;
  selectedDirectory: string;
}

@Injectable()
export class Config implements ConfigOptions {

  // signalRToken
  private _autoUpdate: boolean;
  private _$autoUpdate = new BehaviorSubject<boolean>(null);

  public get autoUpdate() {
    return this._autoUpdate;
  }

  public set autoUpdate(value) {
    this._autoUpdate = value;
    this._$autoUpdate.next(value);
  }

  public get $autoUpdate() {
    return this._$autoUpdate.asObservable();
  }

  // signalRToken
  private _signalRToken: string;
  private _$signalRToken = new BehaviorSubject<string>(null);

  public get signalRToken() {
    return 'test';
    return this._signalRToken;
  }

  public set signalRToken(value) {
    this._signalRToken = value;
    this._$signalRToken.next(value);
  }

  public get $signalRToken() {
    return this._$signalRToken.asObservable();
  }

  // SelectedDirectory
  private _selectedDirectory: string;
  private _$selectedDirectory = new BehaviorSubject<string>(null);

  public get selectedDirectory() {
    return this._selectedDirectory;
  }

  public set selectedDirectory(value) {
    this._selectedDirectory = value;
    this._$selectedDirectory.next(value);
  }

  public get $selectedDirectory() {
    return this._$selectedDirectory.asObservable();
  }

  constructor(@Inject(ConfigServiceToken) private configService: ConfigService) {
    this.configService.load().then(config => {
      this.signalRToken = config.signalRToken;
      this.selectedDirectory = config.selectedDirectory;
    });
  }

  public save(): Promise<any> {
    return this.configService.save({
      signalRToken: this._signalRToken,
      selectedDirectory: this.selectedDirectory
    });
  }
}

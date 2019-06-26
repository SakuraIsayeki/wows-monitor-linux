import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, interval, from } from 'rxjs';
import { ConfigService, ConfigServiceToken } from 'src/app/interfaces/config.service';
import { skipWhile, take, switchMap } from 'rxjs/operators';

export const defaultConfig: ConfigOptions = {
  autoUpdate: true,
  playerBackgrounds: true,
  fontsize: 'normal'
};

export interface ConfigOptions {
  autoUpdate?: boolean;
  signalRToken?: string;
  selectedDirectory?: string;
  playerBackgrounds?: boolean;
  fontsize?: string;
}

@Injectable()
export class Config implements ConfigOptions {

  // autoUpdate
  private _autoUpdate: boolean;
  private _$autoUpdate = new BehaviorSubject<boolean>(null);

  get autoUpdate() {
    return this._autoUpdate;
  }

  set autoUpdate(value) {
    this._autoUpdate = value;
    this._$autoUpdate.next(value);
  }

  get $autoUpdate() {
    return this._$autoUpdate.asObservable();
  }

  // signalRToken
  private _signalRToken: string;
  private _$signalRToken = new BehaviorSubject<string>(null);

  get signalRToken() {
    return this._signalRToken;
  }

  set signalRToken(value) {
    this._signalRToken = value;
    this._$signalRToken.next(value);
  }

  get $signalRToken() {
    return this._$signalRToken.asObservable();
  }

  // SelectedDirectory
  private _selectedDirectory: string;
  private _$selectedDirectory = new BehaviorSubject<string>(null);

  get selectedDirectory() {
    return this._selectedDirectory;
  }

  set selectedDirectory(value) {
    this._selectedDirectory = value;
    this._$selectedDirectory.next(value);
  }

  get $selectedDirectory() {
    return this._$selectedDirectory.asObservable();
  }

  // PlayerBackgrounds
  private _playerBackgrounds: boolean;
  private _$playerBackgrounds = new BehaviorSubject<boolean>(null);

  get playerBackgrounds() {
    return this._playerBackgrounds;
  }

  set playerBackgrounds(value) {
    this._playerBackgrounds = value;
    this._$playerBackgrounds.next(value);
  }

  get $playerBackgrounds() {
    return this._$playerBackgrounds.asObservable();
  }

  // Fontsize
  private _fontsize: string;
  private _$fontsize = new BehaviorSubject<string>(null);

  get fontsize() {
    return this._fontsize;
  }

  set fontsize(value) {
    this._fontsize = value;
    this._$fontsize.next(value);
  }

  get $fontsize() {
    return this._$fontsize.asObservable();
  }

  private loaded = false;

  constructor(@Inject(ConfigServiceToken) private configService: ConfigService) {
    this.configService.load().then(config => {
      this.autoUpdate = config.autoUpdate;
      this.signalRToken = config.signalRToken;
      this.selectedDirectory = config.selectedDirectory;
      this.playerBackgrounds = config.playerBackgrounds;
      this.fontsize = config.fontsize;

      this.loaded = true;
    });
  }

  async waitTillLoaded() {
    if (this.loaded) {
      return true;
    }
    await interval(300).pipe(
      skipWhile(() => !this.loaded),
      take(1)).toPromise();
    return true;
  }

  async save(): Promise<any> {
    await this.waitTillLoaded();
    return from(this.configService.save({
      autoUpdate: this._autoUpdate,
      signalRToken: this._signalRToken,
      selectedDirectory: this._selectedDirectory,
      playerBackgrounds: this._playerBackgrounds,
      fontsize: this._fontsize
    }));
  }
}

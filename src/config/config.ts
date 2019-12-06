import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, interval, from } from 'rxjs';
import { ConfigService, ConfigServiceToken } from 'src/app/interfaces/config.service';
import { skipWhile, take, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface ConfigOptions {
  autoUpdate?: boolean;
  signalRToken?: string;
  selectedDirectory?: string;
  playerBackgrounds?: string;
  fontsize?: string;
  coloredValues?: boolean;
  overwriteReplaysDirectory?: string;
  forceLandscape?: boolean;
  seenChangelogs?: number[];
  closeToTray?: boolean;
}

export const defaultConfig: ConfigOptions = {
  autoUpdate: true,
  playerBackgrounds: 'pr',
  fontsize: 'normal',
  coloredValues: true,
  seenChangelogs: []
};

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
  private _playerBackgrounds: string;
  private _$playerBackgrounds = new BehaviorSubject<string>(null);

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

  // UseColoredValues
  private _coloredValues: boolean;
  private _$coloredValues = new BehaviorSubject<boolean>(null);

  get coloredValues() {
    return this._coloredValues;
  }

  set coloredValues(value) {
    this._coloredValues = value;
    this._$coloredValues.next(value);
  }

  get $useColoredValues() {
    return this._$coloredValues.asObservable();
  }

  // OverwriteReplaysDirectory
  private _overwriteReplaysDirectory: string;
  private _$overwriteReplaysDirectory = new BehaviorSubject<string>(null);

  get overwriteReplaysDirectory() {
    return this._overwriteReplaysDirectory;
  }

  set overwriteReplaysDirectory(value) {
    this._overwriteReplaysDirectory = value;
    this._$overwriteReplaysDirectory.next(value);
  }

  get $overwriteReplaysDirectory() {
    return this._$overwriteReplaysDirectory.asObservable();
  }

  // SeenChangelogs
  private _seenChangelogs: number[];
  private _$seenChangelogs = new BehaviorSubject<number[]>(null);

  get seenChangelogs() {
    return this._seenChangelogs;
  }

  set seenChangelogs(value) {
    this._seenChangelogs = value;
    this._$seenChangelogs.next(value);
  }

  pushSeenChangelogs(...items: number[]) {
    if (!this._seenChangelogs)
      this._seenChangelogs = [];
    this._seenChangelogs.push(...items);
    this._seenChangelogs = this._seenChangelogs.filter((value, index, self) => self.indexOf(value) === index);
    this._$seenChangelogs.next(this._seenChangelogs);
  }

  get $seenChangelogs() {
    return this._$seenChangelogs.asObservable();
  }

  // forceLandscape
  private _forceLandscape: boolean;
  private _$forceLandscape = new BehaviorSubject<boolean>(null);

  get forceLandscape() {
    return this._autoUpdate;
  }

  set forceLandscape(value) {
    this._forceLandscape = value;
    this._$forceLandscape.next(value);
    if (environment.browser) {
      if (value) {
        screen.orientation.lock('landscape');
      } else {
        screen.orientation.unlock();
      }
    }
  }

  get $forceLandscape() {
    return this._$forceLandscape.asObservable();
  }

  // closeToTray
  private _closeToTray: boolean;
  private _$closeToTray = new BehaviorSubject<boolean>(null);

  get closeToTray() {
    return this._closeToTray;
  }

  set closeToTray(value) {
    this._closeToTray = value;
    this._$closeToTray.next(value);
  }

  get $closeToTray() {
    return this._$closeToTray.asObservable();
  }

  private loaded = false;

  constructor(@Inject(ConfigServiceToken) private configService: ConfigService) {
    this.configService.load().then(config => {
      this.autoUpdate = config.autoUpdate;
      this.signalRToken = config.signalRToken;
      this.selectedDirectory = config.selectedDirectory;
      this.playerBackgrounds = this.applyPlayerBackgroundsMigration(config.playerBackgrounds);
      this.fontsize = config.fontsize;
      this.coloredValues = config.coloredValues;
      this.overwriteReplaysDirectory = config.overwriteReplaysDirectory;
      this.seenChangelogs = config.seenChangelogs;
      this.forceLandscape = config.forceLandscape;
      this.closeToTray = config.closeToTray;

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
      fontsize: this._fontsize,
      coloredValues: this._coloredValues,
      overwriteReplaysDirectory: this._overwriteReplaysDirectory,
      seenChangelogs: this._seenChangelogs,
      closeToTray: this._closeToTray
    }));
  }


  private applyPlayerBackgroundsMigration(value: any) {
    if (value === false) {
      return 'off'
    }
    return 'pr';
  }
}

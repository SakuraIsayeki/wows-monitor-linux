import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, from, interval, Observable } from 'rxjs';
import { share, skipWhile, take } from 'rxjs/operators';
import { ConfigService, ConfigServiceToken } from 'src/app/interfaces/config.service';
import { ConfigtoolConfig, defaultConfigtoolConfig } from 'src/app/interfaces/configtool-config.interface';
import { environment } from 'src/environments/environment';
const uuidv4 = require('uuid/v4');

type PlayerBackgrounds = 'pr' | 'wr' | 'accwr' | 'avgDmg';
type FontSize = 'small' | 'normal' | 'big' | 'huge';
type PlayerBackgroundsMode = 'disabled' | 'background' | 'border';
type LayoutMode = 'normal' | 'compact' | 'legacy';

export interface ConfigOptions {
  autoUpdate?: boolean;
  allowBeta?: boolean;
  signalRToken?: string;
  selectedDirectory?: string;
  layoutMode?: LayoutMode;
  playerBackgrounds?: PlayerBackgrounds;
  playerBackgroundsMode?: PlayerBackgroundsMode;
  highContrastMode?: boolean;
  fontsize?: FontSize;
  coloredValues?: boolean;
  overwriteReplaysDirectory?: string;
  seenChangelogs?: number[];
  closeToTray?: boolean;
  uuid?: string;
  configtoolConfig?: ConfigtoolConfig;
}

export const defaultConfig: ConfigOptions = {
  autoUpdate: true,
  layoutMode: 'normal',
  playerBackgrounds: 'pr',
  playerBackgroundsMode: 'background',
  fontsize: 'normal',
  coloredValues: true,
  seenChangelogs: [],
  uuid: environment.desktop ? uuidv4() : '',
  configtoolConfig: defaultConfigtoolConfig
};

@Injectable()
export class Config implements ConfigOptions {

  constructor(@Inject(ConfigServiceToken) private configService: ConfigService) {
    this.configService.load().then(config => {

      this.ensureValues(config);

      this.autoUpdate = config.autoUpdate;
      this.allowBeta = config.allowBeta;
      this.signalRToken = config.signalRToken;
      this.selectedDirectory = config.selectedDirectory;
      this.layoutMode = config.layoutMode;
      this.playerBackgrounds = config.playerBackgrounds;
      this.playerBackgroundsMode = config.playerBackgroundsMode;
      this.highContrastMode = config.highContrastMode;
      this.fontsize = config.fontsize;
      this.coloredValues = config.coloredValues;
      this.overwriteReplaysDirectory = config.overwriteReplaysDirectory;
      this.seenChangelogs = config.seenChangelogs;
      this.closeToTray = config.closeToTray;
      this._uuid = config.uuid;
      this.configtoolConfig = config.configtoolConfig;

      this.loaded = true;

      this.save();
    });

    this._$settingChanged = combineLatest([
      this.$autoUpdate,
      this.$allowBeta,
      this.$layoutMode,
      this.$playerBackgrounds,
      this.$playerBackgroundsMode,
      this.$highContrastMode,
      this.$fontsize,
      this.$useColoredValues,
      this.$overwriteReplaysDirectory,
      this.$closeToTray
    ]).pipe(share());
  }

  async save(): Promise<any> {
    await this.waitTillLoaded();
    return from(this.configService.save({
      autoUpdate: this._autoUpdate,
      allowBeta: this._allowBeta,
      signalRToken: this._signalRToken,
      selectedDirectory: this._selectedDirectory,
      layoutMode: this._layoutMode,
      playerBackgrounds: this._playerBackgrounds,
      playerBackgroundsMode: this.playerBackgroundsMode,
      highContrastMode: this.highContrastMode,
      fontsize: this._fontsize,
      coloredValues: this._coloredValues,
      overwriteReplaysDirectory: this._overwriteReplaysDirectory,
      seenChangelogs: this._seenChangelogs,
      closeToTray: this._closeToTray,
      uuid: this._uuid,
      configtoolConfig: this._configtoolConfig
    }));
  }

  private ensureValues(config: ConfigOptions) {
    for (const key of Object.keys(defaultConfig)) {
      if (config[key] == null || config[key] === undefined) {
        config[key] = defaultConfig[key];
      }
    }
  }

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

  // allowBeta
  private _allowBeta: boolean;
  private _$allowBeta = new BehaviorSubject<boolean>(null);

  get allowBeta() {
    return this._allowBeta;
  }

  set allowBeta(value) {
    this._allowBeta = value;
    this._$allowBeta.next(value);
  }

  get $allowBeta() {
    return this._$allowBeta.asObservable();
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

  // layoutMode
  private _layoutMode: LayoutMode;
  private _$layoutMode = new BehaviorSubject<LayoutMode>(null);

  get layoutMode() {
    return this._layoutMode;
  }

  set layoutMode(value) {
    this._layoutMode = value;
    this._$layoutMode.next(value);
  }

  get $layoutMode() {
    return this._$layoutMode.asObservable();
  }

  // playerBackgroundsMode
  private _playerBackgroundsMode: PlayerBackgroundsMode;
  private _$playerBackgroundsMode = new BehaviorSubject<PlayerBackgroundsMode>(null);

  get playerBackgroundsMode() {
    return this._playerBackgroundsMode;
  }

  set playerBackgroundsMode(value) {
    this._playerBackgroundsMode = value;
    this._$playerBackgroundsMode.next(value);
  }

  get $playerBackgroundsMode() {
    return this._$playerBackgroundsMode.asObservable();
  }

  // PlayerBackgrounds
  private _playerBackgrounds: PlayerBackgrounds;
  private _$playerBackgrounds = new BehaviorSubject<PlayerBackgrounds>(null);

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

  // PlayerBackgrounds
  private _highContrastMode: boolean;
  private _$highContrastMode = new BehaviorSubject<boolean>(null);

  get highContrastMode() {
    return this._highContrastMode;
  }

  set highContrastMode(value) {
    this._highContrastMode = value;
    this._$highContrastMode.next(value);
  }

  get $highContrastMode() {
    return this._$highContrastMode.asObservable();
  }

  // Fontsize
  private _fontsize: FontSize;
  private _$fontsize = new BehaviorSubject<FontSize>(null);

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
    if (!this._seenChangelogs) {
      this._seenChangelogs = [];
    }
    this._seenChangelogs.push(...items);
    this._seenChangelogs = this._seenChangelogs.filter((value, index, self) => self.indexOf(value) === index);
    this._$seenChangelogs.next(this._seenChangelogs);
  }

  get $seenChangelogs() {
    return this._$seenChangelogs.asObservable();
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

  //configToolConfig
  private _configtoolConfig: ConfigtoolConfig;
  private _$configtoolConfig = new BehaviorSubject<ConfigtoolConfig>(null);

  get configtoolConfig() {
    return this._configtoolConfig;
  }

  set configtoolConfig(value) {
    this._configtoolConfig = value;
    this._$configtoolConfig.next(value);
  }

  get $configtoolConfig() {
    return this._$configtoolConfig.asObservable();
  }

  private _uuid: string;

  get uuid() {
    return this._uuid;
  }

  set uuid(value: string) {
    if (!this._uuid) {
      this._uuid = value;
    }
  }

  private loaded = false;

  private _$settingChanged: Observable<any>;

  public get $settingChanged() {
    return this._$settingChanged;
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

  private applyPlayerBackgroundsMigration(value: any) {
    if (value === false) {
      return 'off';
    }
    if (value) {
      return value;
    }
    return 'pr';
  }
}

import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, from, interval, Observable } from 'rxjs';
import { share, skipWhile, take } from 'rxjs/operators';
import { ClanWarsConfig, defaultClanWarsConfig } from '@interfaces/clanwars-config';
import { ConfigService, ConfigServiceToken } from '@interfaces/config.service';
import { ConfigtoolConfig, defaultConfigtoolConfig } from '@interfaces/configtool-config';
import { defaultLivefeedConfig, LivefeedConfig } from '@interfaces/livefeed-config';
import { environment } from '@environments/environment';
const uuidv4 = require('uuid/v4');

type PlayerBackgrounds = 'pr' | 'wr' | 'accwr' | 'avgDmg';
type FontSize = 'small' | 'normal' | 'big' | 'huge';
type PlayerBackgroundsMode = 'disabled' | 'background' | 'border';
type LayoutMode = 'normal' | 'compact' | 'legacy';
type TeamWinrate = 'average' | 'weighted' | 'median';

export interface ConfigOptions {
  autoUpdate?: boolean;
  analyticsInfoSeen?: boolean;
  anonymIp?: boolean;
  enableAnalytics?: boolean;
  allowBeta?: boolean;
  signalRToken?: string;
  selectedDirectory?: string;
  mainClient?: string;
  layoutMode?: LayoutMode;
  playerBackgrounds?: PlayerBackgrounds;
  playerBackgroundsMode?: PlayerBackgroundsMode;
  highContrastMode?: boolean;
  fontsize?: FontSize;
  coloredValues?: boolean;
  teamWinrate?: TeamWinrate;
  overwriteReplaysDirectory?: string;
  seenChangelogs?: number[];
  closeToTray?: boolean;
  uuid?: string;
  configtoolConfig?: ConfigtoolConfig;
  livefeedConfig?: LivefeedConfig;
  clanWarsConfig?: ClanWarsConfig;
  forcePVP?: boolean;
}

export const defaultConfig: ConfigOptions = {
  autoUpdate: true,
  analyticsInfoSeen: false,
  anonymIp: false,
  enableAnalytics: true,
  layoutMode: 'normal',
  playerBackgrounds: 'pr',
  playerBackgroundsMode: 'background',
  fontsize: 'normal',
  coloredValues: true,
  teamWinrate: 'average',
  seenChangelogs: [],
  uuid: environment.desktop ? uuidv4() : '',
  configtoolConfig: defaultConfigtoolConfig,
  livefeedConfig: defaultLivefeedConfig,
  clanWarsConfig: defaultClanWarsConfig,
  forcePVP: false
};

@Injectable()
export class Config implements ConfigOptions {

  constructor(@Inject(ConfigServiceToken) private configService: ConfigService) {
    this.configService.load().then(config => {

      this.ensureValues(config);

      this.autoUpdate = config.autoUpdate;
      this.analyticsInfoSeen = config.analyticsInfoSeen;
      this.anonymIp = config.anonymIp;
      this.enableAnalytics = config.enableAnalytics;
      this.allowBeta = config.allowBeta;
      this.signalRToken = config.signalRToken;
      this.selectedDirectory = config.selectedDirectory;
      this.mainClient = config.mainClient;
      this.layoutMode = config.layoutMode;
      this.playerBackgrounds = config.playerBackgrounds;
      this.playerBackgroundsMode = config.playerBackgroundsMode;
      this.highContrastMode = config.highContrastMode;
      this.fontsize = config.fontsize;
      this.coloredValues = config.coloredValues;
      this.teamWinrate = config.teamWinrate;
      this.overwriteReplaysDirectory = config.overwriteReplaysDirectory;
      this.seenChangelogs = config.seenChangelogs;
      this.closeToTray = config.closeToTray;
      this._uuid = config.uuid;
      this.configtoolConfig = config.configtoolConfig;
      this.livefeedConfig = config.livefeedConfig;
      this.clanWarsConfig = config.clanWarsConfig;
      this.forcePVP = config.forcePVP;

      this.loaded = true;

      this.save();
    });

    this._$settingChanged = combineLatest([
      this.$autoUpdate,
      this.$anonymIp,
      this.$enableAnalytics,
      this.$allowBeta,
      this.$layoutMode,
      this.$playerBackgrounds,
      this.$playerBackgroundsMode,
      this.$highContrastMode,
      this.$fontsize,
      this.$useColoredValues,
      this.$teamWinrate,
      this.$overwriteReplaysDirectory,
      this.$closeToTray,
      this.$livefeedConfig,
      this.$clanWarsConfig,
      this.$forcePVP
    ]).pipe(share());
  }

  async save(): Promise<any> {
    await this.waitTillLoaded();
    return from(this.configService.save({
      autoUpdate: this._autoUpdate,
      analyticsInfoSeen: this._analyticsInfoSeen,
      anonymIp: this._anonymIp,
      enableAnalytics: this._enableAnalytics,
      allowBeta: this._allowBeta,
      signalRToken: this._signalRToken,
      selectedDirectory: this._selectedDirectory,
      mainClient: this._mainClient,
      layoutMode: this._layoutMode,
      playerBackgrounds: this._playerBackgrounds,
      playerBackgroundsMode: this.playerBackgroundsMode,
      highContrastMode: this.highContrastMode,
      fontsize: this._fontsize,
      coloredValues: this._coloredValues,
      teamWinrate: this._teamWinrate,
      overwriteReplaysDirectory: this._overwriteReplaysDirectory,
      seenChangelogs: this._seenChangelogs,
      closeToTray: this._closeToTray,
      uuid: this._uuid,
      configtoolConfig: this._configtoolConfig,
      livefeedConfig: this._livefeedConfig,
      clanWarsConfig: this.clanWarsConfig,
      forcePVP: this.forcePVP
    }));
  }

  private ensureValues(config: ConfigOptions) {
    for (const key of Object.keys(defaultConfig)) {
      if (config[key] == null || config[key] === undefined) {
        config[key] = defaultConfig[key];
      }
    }
    if (!config.mainClient) {
      config.mainClient = config.selectedDirectory;
    }
    if (environment.browser) {
      config.autoUpdate = true;
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

  // analyticsInfoSeen
  private _analyticsInfoSeen: boolean;
  private _$analyticsInfoSeen = new BehaviorSubject<boolean>(null);

  get analyticsInfoSeen() {
    return this._analyticsInfoSeen;
  }

  set analyticsInfoSeen(value) {
    this._analyticsInfoSeen = value;
    this._$analyticsInfoSeen.next(value);
  }

  get $analyticsInfoSeen() {
    return this._$analyticsInfoSeen.asObservable();
  }

  // anonymIp
  private _anonymIp: boolean;
  private _$anonymIp = new BehaviorSubject<boolean>(null);

  get anonymIp() {
    return this._anonymIp;
  }

  set anonymIp(value) {
    this._anonymIp = value;
    this._$anonymIp.next(value);
  }

  get $anonymIp() {
    return this._$anonymIp.asObservable();
  }

  // anonymIp
  private _enableAnalytics: boolean;
  private _$enableAnalytics = new BehaviorSubject<boolean>(null);

  get enableAnalytics() {
    return this._enableAnalytics;
  }

  set enableAnalytics(value) {
    this._enableAnalytics = value;
    this._$enableAnalytics.next(value);
  }

  get $enableAnalytics() {
    return this._$enableAnalytics.asObservable();
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

  // SelectedDirectory
  private _mainClient: string;
  private _$mainClient = new BehaviorSubject<string>(null);

  get mainClient() {
    return this._mainClient;
  }

  set mainClient(value) {
    this._mainClient = value;
    this._$mainClient.next(value);
  }

  get $mainClient() {
    return this._$mainClient.asObservable();
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

  // TeamWinrate
  private _teamWinrate: TeamWinrate;
  private _$teamWinrate = new BehaviorSubject<TeamWinrate>(null);

  get teamWinrate() {
    return this._teamWinrate;
  }

  set teamWinrate(value) {
    this._teamWinrate = value;
    this._$teamWinrate.next(value);
  }

  get $teamWinrate() {
    return this._$teamWinrate.asObservable();
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

  //liveFeedConfig
  private _livefeedConfig: LivefeedConfig;
  private _$livefeedConfig = new BehaviorSubject<LivefeedConfig>(null);

  get livefeedConfig() {
    return this._livefeedConfig;
  }

  set livefeedConfig(value) {
    this._livefeedConfig = value;
    this._$livefeedConfig.next(value);
  }

  get $livefeedConfig() {
    return this._$livefeedConfig.asObservable();
  }

  //ClanWarsConfig
  private _clanWarsConfig: ClanWarsConfig;
  private _$clanWarsConfig = new BehaviorSubject<ClanWarsConfig>(null);

  get clanWarsConfig() {
    return this._clanWarsConfig;
  }

  set clanWarsConfig(value) {
    this._clanWarsConfig = value;
    this._$clanWarsConfig.next(value);
  }

  get $clanWarsConfig() {
    return this._$clanWarsConfig.asObservable();
  }

  // ForcePVP
  private _forcePVP: boolean;
  private _$forcePVP = new BehaviorSubject<boolean>(null);

  get forcePVP() {
    return this._forcePVP;
  }

  set forcePVP(value) {
    this._forcePVP = value;
    this._$forcePVP.next(value);
  }

  get $forcePVP() {
    return this._$forcePVP.asObservable();
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
}

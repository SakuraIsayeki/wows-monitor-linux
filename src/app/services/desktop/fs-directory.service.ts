import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Region } from '@generated/models';
import { DirectoryService, DirectoryStatus } from '@interfaces/directory.service';
import { ElectronService, ElectronServiceToken } from '@interfaces/electron.service';
import { LoggerService, LoggerServiceToken } from '@interfaces/logger.service';
import { SettingsService } from '@services/settings.service';
import { parse as parseXml2Json } from 'fast-xml-parser';
import * as fs from 'fs';
import { join as pathJoin, normalize as pathNormalize } from 'path';
import { BehaviorSubject, combineLatest, interval, Subject, Subscription } from 'rxjs';
import { debounceTime, filter, startWith, switchMap } from 'rxjs/operators';
import { promisify } from 'util';

@Injectable()
export class FsDirectoryService implements DirectoryService {

  private checkUrls: { [key: number]: string } = {
    0: 'http://csis.worldoftanks.eu/csis/wowseu/',
    1: 'http://csis.worldoftanks.com/csis/wowsus/',
    2: 'http://csis.worldoftanks.ru/csis/wowsru/',
    3: 'http://csis.worldoftanks.asia/csis/wowssg/'
  };

  private _$status = new BehaviorSubject<DirectoryStatus>(null);
  private _$changeDetected = new BehaviorSubject<string>(null);
  private _$watcherSubscription: Subscription;
  private _$preferencesSubscription: Subscription;
  private _fs: typeof fs;
  private _lastInfoFound: Date;
  private _lastPreferenceChange: Date;

  // promisified
  private existsAsync: (path: fs.PathLike) => Promise<fs.Stats>;
  private readDirAsync: (path: fs.PathLike, encoding: BufferEncoding) => Promise<string[]>;
  private readFileAsync: (path: fs.PathLike, encoding: BufferEncoding) => Promise<string>;

  private checkPath$ = new Subject();

  get currentStatus() {
    return this._$status.value;
  }

  get $status() {
    return this._$status.asObservable();
  }

  get $changeDetected() {
    return this._$changeDetected.asObservable();
  }

  get lastInfoFound() {
    return this._lastInfoFound;
  }

  constructor(
    @Inject(ElectronServiceToken) private electronService: ElectronService,
    @Inject(LoggerServiceToken) private loggerService: LoggerService,
    private settingsService: SettingsService,
    private httpClient: HttpClient
  ) {
    this._fs = electronService.fs;
    // tslint:disable-next-line: deprecation
    this.existsAsync = promisify(this._fs.stat);
    this.readDirAsync = promisify(this._fs.readdir);
    this.readFileAsync = promisify(this._fs.readFile);
    combineLatest([
      this.settingsService.form.selectedDirectory.valueChanges.pipe(startWith(this.settingsService.form.selectedDirectory.model), filter(p => p != null)),
      this.settingsService.form.monitorConfig.overwriteReplaysDirectory.valueChanges.pipe(startWith(this.settingsService.form.monitorConfig.overwriteReplaysDirectory.model))
    ]).pipe(debounceTime(100))
      .subscribe(c => {
        if (c[1] != null) {
          this._$changeDetected.next(null);
        }
        this.checkPath();
        this.startWatcher();
      });

    this.checkPath$.pipe(debounceTime(1000)).subscribe(() => this._checkPath());
  }

  refresh() {
    this.checkPath();
    this.startWatcher();
  }

  startWatcher(): void {
    if (this._$watcherSubscription) {
      this._$watcherSubscription.unsubscribe();
    }
    this._$watcherSubscription = interval(5000).pipe(
      startWith(0),
      switchMap(() => this.$status.pipe(filter(s => s != null))),
      filter(status => status.replaysFoldersFound)
    ).subscribe(status => {
      status.replaysFolders.forEach(replaysFolder => {
        const infoFile = pathJoin(replaysFolder, 'tempArenaInfo.json');
        if (this._fs.existsSync(infoFile)) {
          const changeDate = this._fs.statSync(infoFile).mtime;
          if (!this._lastInfoFound || changeDate > this._lastInfoFound) {
            this._lastInfoFound = changeDate;
            this._$changeDetected.next(this._fs.readFileSync(infoFile, 'utf8'));
          }
        }
      });
    });

    if (this._$preferencesSubscription) {
      this._$preferencesSubscription.unsubscribe();
    }
    this._$preferencesSubscription = interval(500).subscribe(async () => {
      const basePath = this.settingsService.form.selectedDirectory.model;
      const changeDate = this._fs.statSync(pathJoin(basePath, 'preferences.xml')).mtime;
      if (!this._lastPreferenceChange || changeDate > this._lastPreferenceChange) {
        this._lastPreferenceChange = changeDate;
        const tempStatus = {} as DirectoryStatus;
        await this.readPreferences(basePath, tempStatus);
        if (this.currentStatus && (tempStatus.region !== this.currentStatus.region || tempStatus.clientVersion !== this.currentStatus.clientVersion)) {
          this.checkPath();
        }
      }
    });
  }

  private checkPath() {
    this.checkPath$.next();
  }

  private async _checkPath() {
    const path = this.settingsService.form.selectedDirectory.model;
    const status = {} as DirectoryStatus;

    this.loggerService.debug('CheckPath', 'started', path);

    try {
      if (path && await this.existsAsync(path)) {
        this.loggerService.debug('CheckPath', 'exists', path);
        await this.readPreferences(path, status);
        const resFolder = await this.getResFolderPath(path, status);
        this.loggerService.debug('CheckPath', 'resFolder', resFolder);
        if (await this.readEngineConfig(resFolder, status)) {
          this.loggerService.debug('CheckPath', 'preferences', status.preferencesPathBase.toString());
          await this.readEngineConfig(pathJoin(resFolder + '_mods'), status);
          this.setReplaysFolder(path, status);
          this.loggerService.debug('CheckPath', 'replaysFolders', status.replaysFolders.join(','));
          status.replaysFoldersFound = status.replaysFolders.some(p => this._fs.existsSync(p));
        }
      }
    } catch (error) {
      this.loggerService.error('Error during path check', error);
    } finally {
      this._$status.next(status);
    }
  }

  async getResFolderPath(basePath: string, status?: DirectoryStatus) {
    const versionRegex = new RegExp(/<version>release\.([\.0-9]*)<\/version>/g);
    if (status == null) {
      status = this._$status.value;
    }

    try {
      const res = await this.httpClient.get(this.checkUrls[status.region], { observe: 'body', responseType: 'text' }).toPromise();
      const versionResult = versionRegex.exec(res);
      const lastDotIndex = versionResult[1].lastIndexOf('.');
      status.clientVersion = '0.' + versionResult[1].substring(0, lastDotIndex);
      status.folderVersion = versionResult[1].substring(lastDotIndex + 1, versionResult[1].length);
      if (!status.folderVersion) {
        throw new Error('Couldn\'t determine folderVersion');
      }
    } catch {
      const binFilesString = (await this.readDirAsync(pathJoin(basePath, 'bin'), 'utf8')) as string[];
      const binFilesSorted = binFilesString
        .filter(s => s.toLowerCase() !== 'clientrunner')
        .map(s => {
          try {
            const val = parseInt(s, 0);
            return isNaN(val) ? 0 : val;
          } catch {
            return 0;
          }
        })
        .sort((a, b) => b - a);
      const latest = binFilesSorted[0];
      status.folderVersion = latest.toString();
    }
    return pathJoin(basePath, 'bin', status.folderVersion, 'res');
  }

  private async readEngineConfig(resPath: string, status: DirectoryStatus) {
    const path = pathJoin(resPath, 'engine_config.xml');
    if (this._fs.existsSync(path)) {
      const content = await this.readFileAsync(path, 'utf8');
      const json = parseXml2Json(content);

      const engineConfig = json['engine_config.xml'];
      try {
        status.preferencesPathBase = engineConfig.preferences.pathBase;
      } catch (error) {
        this.loggerService.error('Error while reading preferences.pathBase in ' + resPath, error);
        return false;
      }

      try {
        status.replaysPathBase = engineConfig.replays.pathBase;
      } catch (error) {
        this.loggerService.error('Error while reading replays.pathBase in ' + resPath, error);
        return false;
      }

      try {
        status.replaysDirPath = engineConfig.replays.dirPath;
      } catch (error) {
        this.loggerService.error('Error while reading replays.dirPath in ' + resPath, error);
        return false;
      }

      try {
        status.replaysVersioned = engineConfig.replays.versioned;
      } catch (error) {
        this.loggerService.error('Error while reading replays.versioned in ' + resPath, error);
        return false;
      }

      return true;
    } else {
      this.loggerService.error('readEngineConfig', 'Could not find engineConfig at ' + resPath);
      return false;
    }
  }

  private async readPreferences(basePath: string, status: DirectoryStatus) {
    //const versionRegex = new RegExp(/<clientVersion>([\s,0-9]*)<\/clientVersion>/g);
    const regionRegex = new RegExp(/<active_server>([\sA-Z]*)<\/active_server>/g);
    try {
      const content = await this.readFileAsync(pathJoin(basePath, 'preferences.xml'), 'utf8');

      //const versionResult = versionRegex.exec(content);
      const regionResult = regionRegex.exec(content);

      status.region = Region[regionResult[1].replace('WOWS', '').replace('CIS', 'RU').trim()];
      //status.clientVersion = versionResult[1].replace(/,/g, '.').replace(/\s/g, '').trim();
    } catch (error) {
      this.loggerService.error('Error while reading preferences.xml in ' + basePath, error);
    }
  }

  private setReplaysFolder(basePath: string, status: DirectoryStatus) {
    if (this.settingsService.form.monitorConfig.overwriteReplaysDirectory.model?.length > 0) {
      status.replaysFolders = [this.settingsService.form.monitorConfig.overwriteReplaysDirectory.model];
    } else {
      if (status.replaysPathBase === 'CWD') {
        status.replaysFolders = [pathJoin(basePath, status.replaysDirPath)];
      } else if (status.replaysPathBase === 'EXE_PATH') {
        status.replaysFolders = [
          pathJoin(basePath, 'bin', status.folderVersion, 'bin32', status.replaysDirPath),
          pathJoin(basePath, 'bin', status.folderVersion, 'bin64', status.replaysDirPath)
        ];
      }

      if (status.replaysVersioned) {
        status.replaysFolders = status.replaysFolders.map(path => pathJoin(path, status.clientVersion));
      }
      status.replaysFolders = status.replaysFolders.map(path => pathNormalize(path));
    }
  }
}

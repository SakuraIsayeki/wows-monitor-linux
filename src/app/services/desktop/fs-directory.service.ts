import { Inject, Injectable } from '@angular/core';
import { parse as parseXml2Json } from 'fast-xml-parser';
import * as fs from 'fs';
import { dirname, join as pathJoin, normalize as pathNormalize } from 'path';
import { BehaviorSubject, interval, Subscription, merge } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';
import { DirectoryService, DirectoryStatus } from 'src/app/interfaces/directory.service';
import { LoggerService, LoggerServiceToken } from 'src/app/interfaces/logger.service';
import { Region } from 'src/app/interfaces/region';
import { Config, ConfigOptions } from 'src/config/config';
import { promisify } from 'util';
import { ElectronService } from './electron.service';

@Injectable()
export class FsDirectoryService implements DirectoryService {

  private _$status = new BehaviorSubject<DirectoryStatus>(null);
  private _$changeDetected = new BehaviorSubject<string>(null);
  private _$watcherSubscription: Subscription;
  private _fs: typeof fs;
  private _lastInfoFound: Date;

  // promisified
  private existsAsync: (path: fs.PathLike) => Promise<fs.Stats>;
  private readDirAsync: (path: fs.PathLike, encoding: BufferEncoding) => Promise<string[]>;
  private readFileAsync: (path: fs.PathLike, encoding: BufferEncoding) => Promise<string>;

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
    electronService: ElectronService,
    @Inject(LoggerServiceToken) private loggerService: LoggerService,
    private config: Config
  ) {
    this._fs = electronService.fs;
    // tslint:disable-next-line: deprecation
    this.existsAsync = promisify(this._fs.stat);
    this.readDirAsync = promisify(this._fs.readdir);
    this.readFileAsync = promisify(this._fs.readFile);
    merge(
      this.config.$selectedDirectory.pipe(filter(p => p != null)),
      this.config.$overwriteReplaysDirectory.pipe(filter(p => p != null))
    )
      .subscribe(c => {
        this.checkPath();
        this.startWatcher();
      });
  }

  changePath(path: string): void {
    this.config.selectedDirectory = pathNormalize(path);
    this.config.save();
    this.checkPath();
    this.startWatcher();
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
  }

  private async checkPath() {
    const path = this.config.selectedDirectory;
    const status = {} as DirectoryStatus;

    this.loggerService.debug('CheckPath', 'started', path);

    try {
      if (path && await this.existsAsync(path)) {
        this.loggerService.debug('CheckPath', 'exists', path);

        try {
          status.steamVersion = (await this.existsAsync(pathJoin(path, 'bin', 'clientrunner'))) != null;
        } catch {
          // For non-steam versions
        }
        const resFolder = await this.getResFolderPath(path, status);
        this.loggerService.debug('CheckPath', 'resFolder', resFolder);
        if (await this.readEngineConfig(resFolder, status)) {
          this.loggerService.debug('CheckPath', 'preferences', status.preferencesPathBase.toString());
          await this.readPreferences(path, status);
          await this.readEngineConfig(pathJoin(resFolder + '_mods', status.clientVersion), status);
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

  private async getResFolderPath(basePath: string, status: DirectoryStatus) {
    if (!status.steamVersion) {
      return pathJoin(basePath, 'res');
    } else {
      const binFilesString = (await this.readDirAsync(pathJoin(basePath, 'bin'), 'utf8')) as string[];
      const binFilesSorted = binFilesString
        .filter(s => s.toLowerCase() !== 'clientrunner')
        .map(s => parseInt(s))
        .sort((a, b) => b - a);
      const latest = binFilesSorted[0];
      status.folderVersion = latest.toString();
      return pathJoin(basePath, 'bin', status.folderVersion, 'res');
    }
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
    const versionRegex = new RegExp(/<clientVersion>([\s,0-9]*)<\/clientVersion>/g);
    const regionRegex = new RegExp(/<active_server>([\sA-Z]*)<\/active_server>/g);
    let path = '';
    if (status.steamVersion) {
      path = status.preferencesPathBase === 'CWD' ? basePath : pathJoin(basePath, 'bin', status.folderVersion);
    } else {
      path = basePath;
    }

    try {
      const content = await this.readFileAsync(pathJoin(path, 'preferences.xml'), 'utf8');

      const versionResult = versionRegex.exec(content);
      const regionResult = regionRegex.exec(content);

      status.region = Region[regionResult[1].replace('WOWS', '').trim()];
      status.clientVersion = versionResult[1].replace(/,/g, '.').replace(/\s/g, '').trim();
    } catch (error) {
      this.loggerService.error('Error while reading preferences.xml in ' + path, error);
    }
  }

  private setReplaysFolder(basePath: string, status: DirectoryStatus) {
    if (this.config.overwriteReplaysDirectory) {
      status.replaysFolders = [this.config.overwriteReplaysDirectory];
    } else if (status.replaysPathBase === 'CWD') {
      status.replaysFolders = [pathJoin(basePath, status.replaysDirPath)];
    } else if (status.replaysPathBase === 'EXE_PATH') {
      if (status.steamVersion) {
        status.replaysFolders = [
          pathJoin(basePath, 'bin', status.folderVersion, 'bin32', status.replaysDirPath),
          pathJoin(basePath, 'bin', status.folderVersion, 'bin64', status.replaysDirPath)
        ];

      } else {
        status.replaysFolders = [
          pathJoin(basePath, 'bin32', status.replaysDirPath),
          pathJoin(basePath, 'bin64', status.replaysDirPath)
        ];
      }
    }

    if (status.replaysVersioned) {
      status.replaysFolders = status.replaysFolders.map(path => pathJoin(path, status.clientVersion));
    }
    status.replaysFolders = status.replaysFolders.map(path => pathNormalize(path));
  }
}

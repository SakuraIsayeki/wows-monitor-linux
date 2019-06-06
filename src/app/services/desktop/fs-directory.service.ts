import { ApplicationRef, Inject, Injectable, NgZone } from '@angular/core';
import { parse as parseXml2Json } from 'fast-xml-parser';
import * as fs from 'fs';
import { dirname, join as pathJoin, normalize as pathNormalize } from 'path';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { filter, switchMap, take, startWith } from 'rxjs/operators';
import { DirectoryService, DirectoryStatus } from 'src/app/interfaces/directory.service';
import { LoggerService, LoggerServiceToken } from 'src/app/interfaces/logger.service';
import { Config } from 'src/config/config';
import { promisify } from 'util';
import { ElectronService } from './electron.service';
import { Region } from 'src/app/interfaces/region';

@Injectable()
export class FsDirectoryService implements DirectoryService {

  private _$status = new BehaviorSubject<DirectoryStatus>(null);
  private _$changeDetected = new BehaviorSubject<string>(null);
  private _$watcherSubscription: Subscription;
  private _fs: typeof fs;
  private _lastInfoFound: Date;

  // promisified
  private existsAsync: (path: fs.PathLike) => Promise<boolean>;
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
    appRef: ApplicationRef,
    @Inject(LoggerServiceToken) private loggerService: LoggerService,
    private config: Config,
    private ngZone: NgZone
  ) {
    this._fs = electronService.fs;
    // tslint:disable-next-line: deprecation
    this.existsAsync = promisify(this._fs.exists);
    this.readDirAsync = promisify(this._fs.readdir);
    this.readFileAsync = promisify(this._fs.readFile);
    this.config.$selectedDirectory.pipe(filter(p => p != null)).subscribe(() => {
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

    if (await this.existsAsync(path)) {
      try {
        const files = (await this.readDirAsync(path, 'utf8')) as string[];
        status.steamVersion = files.some(f => f.includes('steam_api.dll'));
        const resFolder = await this.getResFolderPath(path, status);
        await this.readEngineConfig(resFolder, status);
        await this.readPreferences(path, status);
        await this.readEngineConfig(pathJoin(resFolder + '_mods', status.clientVersion), status);

        this.setReplaysFolder(path, status);
        status.replaysFoldersFound = status.replaysFolders.some(p => this._fs.existsSync(p));
      } catch (error) {
        this.loggerService.error('Error during path check', error);
      }

    }
    this._$status.next(status);
  }

  private async getResFolderPath(basePath: string, status: DirectoryStatus) {
    if (!status.steamVersion) {
      return pathJoin(basePath, 'res');
    } else {
      const bin = (await this.readDirAsync(pathJoin(basePath, 'bin'), 'utf8')) as string[];
      bin.map(dirname).sort((a, b) => {
        if (a > b) {
          return 1;
        } else if (a < b) {
          return -1;
        } else {
          return 0;
        }
      });
      const latest = bin[bin.length - 1];
      status.folderVersion = latest;
      return pathJoin(basePath, 'bin', latest, 'res');
    }
  }

  private async readEngineConfig(resPath: string, status: DirectoryStatus) {
    const path = pathJoin(resPath, 'engine_config.xml');
    if (this._fs.existsSync(path)) {
      const content = await this.readFileAsync(path, 'utf8');
      const json = parseXml2Json(content);

      const engineConfig = json['engine_config.xml'];
      status.preferencesPathBase = engineConfig.preferences.pathBase;
      status.replaysPathBase = engineConfig.replays.pathBase;
      status.replaysDirPath = engineConfig.replays.dirPath;
      status.replaysVersioned = engineConfig.replays.versioned;
    }
  }

  private async readPreferences(basePath: string, status: DirectoryStatus) {
    let path = '';
    if (status.steamVersion) {
      path = status.preferencesPathBase === 'CWD' ? basePath : pathJoin(basePath, 'bin', status.folderVersion);
    } else {
      path = basePath;
    }

    let content = await this.readFileAsync(pathJoin(path, 'preferences.xml'), 'utf8');
    content = content.replace(/@/g, '');
    const json = parseXml2Json(content);

    const clientVersion = json['preferences.xml'].clientVersion.replace(/,\s/g, '.');
    let region: string = json['preferences.xml'].scriptsPreferences.net_credentials.active_server;
    region = region.replace('WOWS', '').trim();
    status.region = Region[region];
    status.clientVersion = clientVersion;
  }

  private setReplaysFolder(basePath: string, status: DirectoryStatus) {
    if (status.replaysPathBase === 'CWD') {
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

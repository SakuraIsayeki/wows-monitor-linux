import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { j2xParser, parse as parseXml2Json } from 'fast-xml-parser';
import { join as pathJoin } from 'path';
import { Subject } from 'rxjs';
import { ConfigtoolConfig } from 'src/app/interfaces/configtool-config';
import { Config } from 'src/config/config';
import { BaseComponent } from '../../base.component';
import { debounceTime } from 'rxjs/operators';
import { DirectoryService, DirectoryServiceToken } from 'src/app/interfaces/directory.service';
import { ElectronService, ElectronServiceToken } from 'src/app/interfaces/electron.service';

@Component({
  selector: 'app-configtool',
  templateUrl: './configtool.component.html'
})
export class ConfigtoolComponent extends BaseComponent implements OnInit, OnDestroy {

  private $configChanged = new Subject();

  lines: ConsoleLine[] = [];
  showDescription = false;

  constructor(
    @Inject(ElectronServiceToken) private electronService: ElectronService,
    public config: Config,
    @Inject(DirectoryServiceToken) private directoryService: DirectoryService) {
    super();
  }

  ngOnInit() {
    this.$configChanged.pipe(this.untilDestroy(), debounceTime(1000)).subscribe(() => {
      this.config.save();
    });
  }

  async start() {
    this.lines = [];
    const combinedPaths = [...this.config.configtoolConfig.clientPaths];
    combinedPaths.unshift(this.config.selectedDirectory);

    for (let i = 0; i < combinedPaths.length; i++) {
      const path = combinedPaths[i];
      if (path === '') { continue; }

      this.writeWarn(i === 0 ? 'Processing main client' : `Processing client ${i}`);

      let resPath = pathJoin(path, 'res');
      //if (this.directoryService.currentStatus.steamVersion) {
      resPath = await this.directoryService.getResFolderPath(path);
      //}
      await this.setValues(pathJoin(resPath, 'engine_config.xml'), this.config.configtoolConfig);
      await this.setValues(pathJoin(resPath + '_mods', 'engine_config.xml'),
        this.config.configtoolConfig, true);
    }
  }

  async removePath(i: number) {
    const path = this.config.configtoolConfig.clientPaths[i];
    if (path == this.config.selectedDirectory) {
      this.config.selectedDirectory = this.config.mainClient;
    }
    this.config.configtoolConfig.clientPaths.splice(i, 1);
    this.configChanged();
  }

  async selectPath(i: number) {
    const path = this.config.configtoolConfig.clientPaths[i];
    const odr = await this.electronService.dialog.showOpenDialog(this.electronService.remote.BrowserWindow.getFocusedWindow(), {
      defaultPath: path != '' ? path : undefined,
      properties: ['openDirectory']
    });
    if (odr && odr.filePaths && odr.filePaths.length > 0) {
      this.ngZone.run(() => this.config.configtoolConfig.clientPaths[i] = odr.filePaths[0]);
    }
    this.configChanged();
  }

  configChanged() {
    this.$configChanged.next();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  private setValues(path: string, config: ConfigtoolConfig, resMods: boolean = false) {
    if (!this.electronService.fs.existsSync(path)) {
      resMods ? this.writeWarn(`Config override not found in ${path}`)
        : this.writeWarn(`Couldn't find config in ${path}`);
      return;
    }
    try {
      const fileContents = this.electronService.fs.readFileSync(path, { encoding: 'utf8' });
      const version = this.directoryService.currentStatus.clientVersion;
      const backupPath = path.replace('engine_config.xml', `engine_config_backup${version}.xml`);
      if (!this.electronService.fs.existsSync(backupPath)) {
        this.electronService.fs.writeFileSync(backupPath, fileContents);
      }


      this.writeInfo(`Config backup ${path.replace('engine_config.xml', 'engine_config_backup.xml')} saved`);

      const json = parseXml2Json(fileContents);

      json['engine_config.xml'].renderer.maxFrameRate = config.maxFrameRate;
      if (config.cacheEffectsEnabled) {
        json['engine_config.xml'].renderer.cacheEffects = config.cacheEffects;
      }
      if (config.streamCacheSizeKBEnabled) {
        json['engine_config.xml'].animation.streamCacheSizeKB = config.streamCacheSizeKB;
      }
      if (config.maxReplaysToSaveEnabled) {
        json['engine_config.xml'].replays.maxReplaysToSave = config.maxReplaysToSave;
      }
      if (config.versionedReplaysEnabled) {
        json['engine_config.xml'].replays.versioned = config.versionedReplays;
      }
      this.electronService.fs.writeFileSync(path, new j2xParser({ indentBy: '  ', format: true }).parse(json));
      this.writeInfo(`Config ${path} saved.`);
    } catch (err) {
      this.writeError(`Couldn't read/write file ${path}`);
      this.writeError(err.message.replace('TypeError: ', '').replace(' of undefined', ''));
    }
  }

  private writeInfo(msg: string) {
    this.lines.push({ severity: 'info', text: msg });
  }

  private writeError(msg: string) {
    this.lines.push({ severity: 'error', text: msg });
  }

  private writeWarn(msg: string) {
    this.lines.push({ severity: 'warn', text: msg });
  }
}

export interface ConsoleLine {
  severity: 'info' | 'error' | 'warn';
  text: string;
}

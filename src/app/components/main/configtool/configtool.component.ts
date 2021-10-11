import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { ConfigtoolConfig } from '@generated/models/configtool-config';
import { DirectoryService, DirectoryServiceToken } from '@interfaces/directory.service';
import { ElectronService, ElectronServiceToken } from '@interfaces/electron.service';
import { SettingsService } from '@services/settings.service';
import { j2xParser, parse as parseXml2Json } from 'fast-xml-parser';
import { join as pathJoin } from 'path';

@Component({
  templateUrl: './configtool.component.html'
})
export class ConfigtoolComponent extends BaseComponent implements OnInit, OnDestroy {

  @HostBinding('class.configtool')
  public classConfigtool = true;

  lines: ConsoleLine[] = [];
  showDescription = false;

  constructor(
    @Inject(ElectronServiceToken) private electronService: ElectronService,
    public settingsService: SettingsService,
    @Inject(DirectoryServiceToken) private directoryService: DirectoryService) {
    super();
  }

  ngOnInit() {

  }

  async start() {
    this.lines = [];
    const combinedPaths = [...this.settingsService.form.configtoolConfig.clientPaths.model];
    combinedPaths.unshift(this.settingsService.form.selectedDirectory.model);

    for (let i = 0; i < combinedPaths.length; i++) {
      const path = combinedPaths[i];
      if (path === '') {
        continue;
      }

      this.writeWarn(i === 0 ? 'Processing main client' : `Processing client ${i}`);

      let resPath = pathJoin(path, 'res');
      //if (this.directoryService.currentStatus.steamVersion) {
      resPath = await this.directoryService.getResFolderPath(path);
      //}
      await this.setValues(pathJoin(resPath, 'engine_config.xml'),
        this.settingsService.form.configtoolConfig.model);
      await this.setValues(pathJoin(resPath + '_mods', 'engine_config.xml'),
        this.settingsService.form.configtoolConfig.model, true);
    }
  }

  async removePath(i: number) {
    const path = this.settingsService.form.configtoolConfig.clientPaths.model[i];
    if (path == this.settingsService.form.selectedDirectory.model) {
      this.settingsService.form.selectedDirectory.setValue(this.settingsService.form.mainClient.model);
    }
    this.settingsService.form.configtoolConfig.clientPaths.model.splice(i, 1);
    this.settingsService.form.configtoolConfig.clientPaths.updateValueAndValidity({ emitEvent: true });
  }

  async selectPath(i: number) {
    const path = this.settingsService.form.configtoolConfig.clientPaths.model[i];
    const odr = await this.electronService.showOpenDialog({
      defaultPath: path != '' ? path : undefined,
      properties: ['openDirectory']
    });
    if (odr && odr.filePaths && odr.filePaths.length > 0) {
      this.ngZone.run(() => this.settingsService.form.configtoolConfig.clientPaths.model[i] = odr.filePaths[0]);
    }
    this.settingsService.form.configtoolConfig.clientPaths.updateValueAndValidity({ emitEvent: true });
  }


  ngOnDestroy() {
    super.ngOnDestroy();
  }

  private async setValues(path: string, config: ConfigtoolConfig, resMods: boolean = false) {
    if (!(await this.existsStat(path))) {
      resMods ? this.writeWarn(`Config override not found in ${path}`)
        : this.writeWarn(`Couldn't find config in ${path}`);
      return;
    }
    try {
      const fileContents = await this.electronService.fs.readFile(path, { encoding: 'utf8' });
      const version = this.directoryService.currentStatus.clientVersion;
      const backupPath = path.replace('engine_config.xml', `engine_config_backup${version}.xml`);
      if (!(await this.existsStat(backupPath))) {
        await this.electronService.fs.writeFile(backupPath, fileContents);
      }


      this.writeInfo(`Config backup ${path.replace('engine_config.xml', 'engine_config_backup.xml')} saved`);

      const json = parseXml2Json(fileContents);

      // json['engine_config.xml'].renderer.maxFrameRate = config.maxFrameRate;
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
      await this.electronService.fs.writeFile(path, new j2xParser({ indentBy: '  ', format: true }).parse(json));
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

  private async existsStat(path: string) {
    try {
      return await this.electronService.fs.stat(path);
    } catch {
      return null;
    }
  }
}

export interface ConsoleLine {
  severity: 'info' | 'error' | 'warn';
  text: string;
}

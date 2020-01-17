import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { DirectoryService, DirectoryServiceToken } from 'src/app/interfaces/directory.service';
import { ElectronService } from 'src/app/services/desktop/electron.service';
import { BaseComponent } from '../../base.component';
import { Config } from 'src/config/config';
import { BehaviorSubject } from 'rxjs';
import { dirname, join as pathJoin, normalize as pathNormalize } from 'path';
import { parse as parseXml2Json, j2xParser } from 'fast-xml-parser';
import { ConfigtoolConfig } from 'src/app/interfaces/configtool-config.interface';
import { promisify } from 'util';

@Component({
  selector: 'app-configtool',
  templateUrl: './configtool.component.html'
})
export class ConfigtoolComponent extends BaseComponent implements OnInit, OnDestroy {

  gamepath = '';

  lines: ConsoleLine[] = [];

  constructor(
    private electronService: ElectronService,
    public config: Config) {
    super();
  }

  ngOnInit() {
  }

  do() {
    let config = <ConfigtoolConfig>{ clientPaths: [], maxFrameRate: 200 };
    const combinedPaths = [...config.clientPaths];
    combinedPaths.unshift(this.config.selectedDirectory);

    for (const path of combinedPaths) {
      this.res(path, config);
      this.resMods(path, config);
    }
  }

  private res(gamePath: string, config: ConfigtoolConfig) {
    const resPath = pathJoin(gamePath, 'res', 'engine_config.xml');
    this.setValues(resPath, config);
  }

  private resMods(gamePath: string, config: ConfigtoolConfig) {
    const resModsPath = pathJoin(gamePath, 'res_mods');
    this.electronService.fs.readdirSync(resModsPath).forEach(folder => {
      const path = pathJoin(resModsPath, folder, 'engine_config.xml');
      this.setValues(path, config);
    });
  }

  private setValues(path: string, config: ConfigtoolConfig) {
    if (!this.electronService.fs.existsSync(path)) {
      this.writeWarn(`Couldn't find config in ${path}`);
      return;
    }
    try {
      const json = parseXml2Json(this.electronService.fs.readFileSync(path, { encoding: 'utf8' }));

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
      this.electronService.fs.writeFileSync(path, new j2xParser({ indentBy: '  ', format: true }).parse(json));
      this.writeInfo(`Config ${path} saved.`);
    } catch (err) {
      this.writeError(`Couldn't write file ${path}`);
      this.writeError(err);
    }

  }

  ngOnDestroy() {
    super.ngOnDestroy();
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

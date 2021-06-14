import { Inject, Injectable } from '@angular/core';
import { ConfigService } from '@interfaces/config.service';
import { ElectronService, ElectronServiceToken } from '@interfaces/electron.service';
import { LoggerService, LoggerServiceToken } from '@interfaces/logger.service';
import { ConfigOptions, defaultConfig } from '@config/config';
import { environment } from '@environments/environment';

@Injectable()
export class FsConfigService implements ConfigService {

  private get fs() {
    return this.electronService.fs;
  }

  private configPath: string;

  constructor(
    @Inject(ElectronServiceToken) private electronService: ElectronService,
    @Inject(LoggerServiceToken) private loggerService: LoggerService
  ) {
    const configBasePath = this.electronService.isWindows()
      ? process.env.APPDATA + '\\@wows-monitor\\'
      : process.env.HOME + '/.config/@wows-monitor/';

    this.configPath = environment.production ? configBasePath + 'config.json' : 'config.json';

    const exists = this.fs.existsSync(this.configPath);
    if (!exists) {
      this.fs.writeFile(this.configPath, JSON.stringify(defaultConfig), (err) => {
        if (err) {
          this.loggerService.error('Create config', err.message);
        }
      });
    }
  }

  save(config: ConfigOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      this.fs.writeFile(this.configPath, JSON.stringify(config), { encoding: 'utf8' }, (error) => {
        if (error) {
          reject(error);
        }
        resolve(null);
      });
    });

  }

  load(): Promise<ConfigOptions> {
    return new Promise((resolve, reject) => {
      this.fs.readFile(this.configPath, { encoding: 'utf8' }, (error, data) => {
        if (error) {
          reject(error);
        }
        resolve(JSON.parse(data));
      });
    });
  }
}

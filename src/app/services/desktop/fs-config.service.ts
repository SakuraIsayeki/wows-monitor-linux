import { Injectable, Inject } from '@angular/core';
import { ConfigService } from 'src/app/interfaces/config.service';
import { ConfigOptions, defaultConfig } from 'src/config/config';
import { ElectronService } from './electron.service';
import { LoggerServiceToken, LoggerService } from 'src/app/interfaces/logger.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class FsConfigService implements ConfigService {

  private get fs() {
    return this.electronService.fs;
  }

  private configPath = environment.production ? process.env.APPDATA + '\\@wows-monitor\\config.json' : 'config.json';

  constructor(
    private electronService: ElectronService,
    @Inject(LoggerServiceToken) private loggerService: LoggerService
  ) {
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
        resolve();
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

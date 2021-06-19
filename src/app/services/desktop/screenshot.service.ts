import { Inject, Injectable, Optional } from '@angular/core';
import { MatchGroup } from '@generated/models';
import { ElectronService, ElectronServiceToken } from '@interfaces/electron.service';
import { SettingsService } from '@services/settings.service';
import { SignalrService } from '@services/signalr.service';
import { BaseInjection } from '@stewie/framework';
import { take } from 'rxjs/operators';

@Injectable()
export class ScreenshotService extends BaseInjection {

  public takingScreenshot = false;

  private spaceRegex = new RegExp('\w', 'g');

  constructor(@Inject(ElectronServiceToken) @Optional() private electron: ElectronService,
              private settings: SettingsService,
              private signalrService: SignalrService) {
    super();
  }


  public async screenshot() {

    if (this.electron && !this.takingScreenshot) {
      this.takingScreenshot = true;
      const main = document.getElementsByTagName('main')[0].getBoundingClientRect();

      const matchInfo = await this.signalrService.$info.pipe(take(1)).toPromise();

      let filename = 'wows-monitor';
      if (this.router.url === '/' && matchInfo) {
        filename = `${matchInfo.map.name.replace(this.spaceRegex, '-').toLowerCase()}-${MatchGroup[matchInfo.matchGroup].toLowerCase()}`;
      }
      filename += '-' + this.getDateString() + '.png';

      await this.electron.ipcRenderer.invoke('take-screenshot', {
        path: this.settings.form.monitorConfig?.screenshotPath?.value,
        filename: filename,
        rect: {
          x: 0,
          y: main.top,
          width: main.width,
          height: main.height
        }
      });

      if (this.settings.form.monitorConfig.screenshotPath) {
        this.uiSuccess('screenshotSaved',);
      } else {
        this.uiSuccess('screenshotTaken');
      }

      this.takingScreenshot = false;
    }
  }

  private getDateString() {
    const date = new Date();

    return `${date.getDate().toString().padStart(2,'0')}-${date.getMonth().toString().padStart(2,'0')}-${date.getFullYear()}-${date.getHours().toString().padStart(2,'0')}-${date.getMinutes().toString().padStart(2,'0')}-${date.getSeconds().toString().padStart(2,'0')}`;
  }
}

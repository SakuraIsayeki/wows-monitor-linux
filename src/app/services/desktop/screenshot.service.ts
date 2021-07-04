import { Inject, Injectable, Optional } from '@angular/core';
import { MatchGroup } from '@generated/models';
import { ElectronService, ElectronServiceToken } from '@interfaces/electron.service';
import { SettingsService } from '@services/settings.service';
import { GatewayService } from '@services/gateway.service';
import { BaseInjection } from '@stewie/framework';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class ScreenshotService extends BaseInjection {

  public takingScreenshot = false;

  private spaceRegex = new RegExp('\w', 'g');

  constructor(@Inject(ElectronServiceToken) @Optional() private electron: ElectronService,
              private settings: SettingsService,
              private signalrService: GatewayService) {
    super();
  }


  public async screenshot() {

    if (this.electron && !this.takingScreenshot) {
      this.takingScreenshot = true;
      await interval(100).pipe(take(1)).toPromise();


      const matchInfo = await this.signalrService.info$.pipe(take(1)).toPromise();

      let filename = 'wows-monitor';
      let rect = null;
      if (this.router.url === '/' && matchInfo) {
        filename = `${matchInfo.map.name.replace(this.spaceRegex, '-').toLowerCase()}-${MatchGroup[matchInfo.matchGroup].toLowerCase()}`;
        const element = document.querySelectorAll('main > .monitor .container')[0].getBoundingClientRect();
        rect = {
          x: Math.floor(element.left),
          y: Math.floor(element.top),
          width: Math.floor(element.width),
          height: Math.floor(element.height)
        }
      }

      filename += '-' + this.getDateString() + '.png';



      await this.electron.ipcRenderer.invoke('take-screenshot', {
        path: this.settings.form.monitorConfig?.screenshotPath?.value,
        filename: filename,
        rect
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

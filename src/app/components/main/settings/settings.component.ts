import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '@components/base.component';
import { Config } from '@config/config';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import { ElectronService, ElectronServiceToken } from '@interfaces/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { ScrollService } from '@services/scroll.service';
import { SelectItem } from 'primeng/api';
import { from, Observable } from 'rxjs';
import { skip, switchMap } from 'rxjs/operators';

declare type ExtSelectItem = { label$: Observable<string>; value: string };

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {

  faDesktop = faDesktop;

  showExaplanationDialog = false;

  fontSizeOptions: ExtSelectItem[] = [
    {
      label$: this.translate.get('settings.appearance.fontsize.items.small'),
      value: 'small'
    },
    {
      label$: this.translate.get('settings.appearance.fontsize.items.normal'),
      value: 'normal'
    },
    {
      label$: this.translate.get('settings.appearance.fontsize.items.big'),
      value: 'big'
    },
    {
      label$: this.translate.get('settings.appearance.fontsize.items.huge'),
      value: 'huge'
    }
  ];

  layoutModeOptions: ExtSelectItem[] = [
    {
      label$: this.translate.get('settings.appearance.layoutMode.items.normal'),
      value: 'normal'
    },
    {
      label$: this.translate.get('settings.appearance.layoutMode.items.compact'),
      value: 'compact'
    },
    {
      label$: this.translate.get('settings.appearance.layoutMode.items.legacy'),
      value: 'legacy'
    }
  ];

  playerBackgroundsOptions: ExtSelectItem[] = [
    {
      label$: this.translate.get('settings.appearance.playerBackgrounds.items.pr'),
      value: 'pr'
    },
    {
      label$: this.translate.get('settings.appearance.playerBackgrounds.items.wr'),
      value: 'wr'
    },
    {
      label$: this.translate.get('settings.appearance.playerBackgrounds.items.accwr'),
      value: 'accwr'
    },
    {
      label$: this.translate.get('settings.appearance.playerBackgrounds.items.avgDmg'),
      value: 'avgDmg'
    }
  ];

  playerBackgroundsModeOptions: ExtSelectItem[] = [
    {
      label$: this.translate.get('settings.appearance.playerBackgroundsMode.items.disabled'),
      value: 'disabled'
    },
    {
      label$: this.translate.get('settings.appearance.playerBackgroundsMode.items.background'),
      value: 'background'
    },
    {
      label$: this.translate.get('settings.appearance.playerBackgroundsMode.items.border'),
      value: 'border'
    }
  ];

  teamWinrateOptions: ExtSelectItem[] = [
    {
      label$: this.translate.get('settings.appearance.teamWinrate.items.average'),
      value: 'average'
    },
    {
      label$: this.translate.get('settings.appearance.teamWinrate.items.weighted'),
      value: 'weighted'
    },
    {
      label$: this.translate.get('settings.appearance.teamWinrate.items.median'),
      value: 'median'
    }
  ];

  constructor(public config: Config,
              private translate: TranslateService,
              @Inject(ElectronServiceToken) private electronService: ElectronService,
              private activatedRoute: ActivatedRoute,
              private scrollService: ScrollService) {
    super();
  }

  ngOnInit() {
    this.config.$settingChanged.pipe(
      this.untilDestroy(),
      skip(1),
      switchMap(() => from(this.config.save()))
    ).subscribe(() => {
      this.uiSuccess('settingsSaved');
    });

  }

  ngAfterViewInit() {
    this.activatedRoute.params
      .pipe(this.untilDestroy())
      .subscribe(params => {
        if (params.goto) {
          this.scrollService.scrollToAnchor(params.goto);
        }
      });
  }

  async selectReplaysPath() {
    const odr = await this.electronService.dialog.showOpenDialog(this.electronService.remote.BrowserWindow.getFocusedWindow(), {
      defaultPath: this.config.selectedDirectory,
      properties: ['openDirectory']
    });
    if (odr && odr.filePaths && odr.filePaths.length > 0) {
      this.ngZone.run(() => this.config.overwriteReplaysDirectory = odr.filePaths[0]);
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}

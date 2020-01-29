import { AfterViewInit, Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import { SelectItem } from 'primeng/api';
import { from } from 'rxjs';
import { skip, switchMap } from 'rxjs/operators';
import { ElectronService } from 'src/app/services/desktop/electron.service';
import { Config } from 'src/config/config';
import { BaseComponent } from '../../base.component';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {

  faDesktop = faDesktop;

  showExaplanationDialog = false;

  fontSizeOptions: SelectItem[] = [
    {
      label: 'settings.appearance.fontsize.items.small',
      value: 'small'
    },
    {
      label: 'settings.appearance.fontsize.items.normal',
      value: 'normal'
    },
    {
      label: 'settings.appearance.fontsize.items.big',
      value: 'big'
    },
    {
      label: 'settings.appearance.fontsize.items.huge',
      value: 'huge'
    }
  ];

  layoutModeOptions: SelectItem[] = [
    {
      label: 'settings.appearance.layoutMode.items.normal',
      value: 'normal'
    },
    {
      label: 'settings.appearance.layoutMode.items.compact',
      value: 'compact'
    },
    {
      label: 'settings.appearance.layoutMode.items.legacy',
      value: 'legacy'
    }
  ];

  playerBackgroundsOptions: SelectItem[] = [
    {
      label: 'settings.appearance.playerBackgrounds.items.pr',
      value: 'pr'
    },
    {
      label: 'settings.appearance.playerBackgrounds.items.wr',
      value: 'wr'
    },
    {
      label: 'settings.appearance.playerBackgrounds.items.accwr',
      value: 'accwr'
    },
    {
      label: 'settings.appearance.playerBackgrounds.items.avgDmg',
      value: 'avgDmg'
    }
  ];

  playerBackgroundsModeOptions: SelectItem[] = [
    {
      label: 'settings.appearance.playerBackgroundsMode.items.disabled',
      value: 'disabled'
    },
    {
      label: 'settings.appearance.playerBackgroundsMode.items.background',
      value: 'background'
    },
    {
      label: 'settings.appearance.playerBackgroundsMode.items.border',
      value: 'border'
    }
  ];

  teamWinrateOptions: SelectItem[] = [
    {
      label: 'settings.appearance.teamWinrate.items.average',
      value: 'average'
    },
    {
      label: 'settings.appearance.teamWinrate.items.weighted',
      value: 'weighted'
    },
    {
      label: 'settings.appearance.teamWinrate.items.median',
      value: 'median'
    }
  ];

  constructor(public config: Config,
    @Optional() private electronService: ElectronService,
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

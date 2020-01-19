import { Component, OnInit, OnDestroy, Optional } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { Config } from 'src/config/config';
import { SelectItem } from 'primeng/api';
import { ElectronService } from 'src/app/services/desktop/electron.service';
import { skip, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent extends BaseComponent implements OnInit, OnDestroy {

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

  constructor(public config: Config, @Optional() private electronService: ElectronService) {
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

  async selectReplaysPath() {
    var odr = await this.electronService.dialog.showOpenDialog(this.electronService.remote.BrowserWindow.getFocusedWindow(), {
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

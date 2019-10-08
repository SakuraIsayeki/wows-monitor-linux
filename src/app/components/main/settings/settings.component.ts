import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { Config } from 'src/config/config';
import { SelectItem } from 'primeng/api';
import { ElectronService } from 'src/app/services/desktop/electron.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent extends BaseComponent implements OnInit, OnDestroy {

  fontSizeOptions: SelectItem[] = [
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

  constructor(public config: Config, private electronService: ElectronService) {
    super();
  }

  ngOnInit() {
  }

  selectReplaysPath() {
    this.electronService.dialog.showOpenDialog(this.electronService.remote.BrowserWindow.getFocusedWindow(), {
      defaultPath: this.config.selectedDirectory,
      properties: ['openDirectory']
    }, (paths) => {
      if (paths && paths.length > 0) {
        this.ngZone.run(() => this.config.overwriteReplaysDirectory = paths[0]);
      }
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.config.save().then(() => {
      this.uiSuccess('settingsSaved');
    });
  }
}

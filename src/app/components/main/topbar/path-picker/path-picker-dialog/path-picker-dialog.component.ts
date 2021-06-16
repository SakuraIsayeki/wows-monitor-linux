import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { DirectoryService, DirectoryServiceToken } from '@interfaces/directory.service';
import { ElectronService, ElectronServiceToken } from '@interfaces/electron.service';
import { SettingsService } from '@services/settings.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-path-picker-dialog',
  templateUrl: './path-picker-dialog.component.html'
})
export class PathPickerDialogComponent extends BaseComponent implements OnInit {

  paths = this.settingsService.form.configtoolConfig.clientPaths.model.filter(p => p);
  options: SelectItem[] = [];

  constructor(
    @Inject(ElectronServiceToken) private electronService: ElectronService,
    @Inject(DirectoryServiceToken) public directoryService: DirectoryService,
    public settingsService: SettingsService
  ) {
    super();
  }

  ngOnInit() {
    this.setOptions();
  }

  async pickPath() {
    const odr = await this.electronService.dialog.showOpenDialog(this.electronService.remote.BrowserWindow.getFocusedWindow(), {
      defaultPath: this.settingsService.form.selectedDirectory.model,
      properties: ['openDirectory']
    });
    if (odr && odr.filePaths && odr.filePaths.length > 0) {
      this.ngZone.run(() => {
        const path = odr.filePaths[0];
        this.logDebug('Directory selected', path);
        this.settingsService.form.mainClient.setValue(path);
        this.settingsService.form.selectedDirectory.setValue(path);
        this.setOptions();
      });
    }
  }

  private setOptions() {
    this.options = [{ label: this.settingsService.form.mainClient.model, value: this.settingsService.form.mainClient.model },
      ...this.settingsService.form.configtoolConfig.clientPaths.model.map(p => <SelectItem> { label: p, value: p })];
  }
}

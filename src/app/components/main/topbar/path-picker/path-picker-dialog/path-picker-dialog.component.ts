import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base.component';
import { DirectoryService, DirectoryServiceToken } from 'src/app/interfaces/directory.service';
import { ElectronService } from 'src/app/services/desktop/electron.service';
import { Config } from 'src/config/config';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-path-picker-dialog',
  templateUrl: './path-picker-dialog.component.html'
})
export class PathPickerDialogComponent extends BaseComponent implements OnInit {

  paths = this.config.configtoolConfig.clientPaths.filter(p => p);
  options: SelectItem[] = [];

  constructor(
    private electronService: ElectronService,
    @Inject(DirectoryServiceToken) public directoryService: DirectoryService,
    public config: Config,
  ) {
    super();
  }

  ngOnInit() {
    this.setOptions();
  }

  async pickPath() {
    const odr = await this.electronService.dialog.showOpenDialog(this.electronService.remote.BrowserWindow.getFocusedWindow(), {
      defaultPath: this.config.selectedDirectory,
      properties: ['openDirectory']
    });
    if (odr && odr.filePaths && odr.filePaths.length > 0) {
      this.ngZone.run(() => {
        const path = odr.filePaths[0];
        this.logDebug('Directory selected', path);
        this.config.mainClient = path;
        this.config.selectedDirectory = path;
        this.config.save();
        this.setOptions();
      });
    }
  }

  private setOptions() {
    this.options = [{ label: this.config.mainClient, value: this.config.mainClient },
    ...this.config.configtoolConfig.clientPaths.map(p => <SelectItem>{ label: p, value: p })];
  }
}

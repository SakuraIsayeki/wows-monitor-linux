import { Component, Inject, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { BaseComponent } from '@components/base.component';
import { DirectoryService, DirectoryServiceToken } from '@interfaces/directory.service';
import { ElectronService, ElectronServiceToken } from '@interfaces/electron.service';
import { Config } from '@config/config';

@Component({
  selector: 'app-path-picker-dialog',
  templateUrl: './path-picker-dialog.component.html'
})
export class PathPickerDialogComponent extends BaseComponent implements OnInit {

  paths = this.config.configtoolConfig.clientPaths.filter(p => p);
  options: SelectItem[] = [];

  constructor(
    @Inject(ElectronServiceToken) private electronService: ElectronService,
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

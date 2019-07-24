import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base.component';
import { DirectoryService, DirectoryServiceToken } from 'src/app/interfaces/directory.service';
import { ElectronService } from 'src/app/services/desktop/electron.service';
import { Config } from 'src/config/config';

@Component({
  selector: 'app-path-picker-dialog',
  templateUrl: './path-picker-dialog.component.html'
})
export class PathPickerDialogComponent extends BaseComponent implements OnInit {

  constructor(
    private electronService: ElectronService,
    @Inject(DirectoryServiceToken) public directoryService: DirectoryService,
    public config: Config,
  ) {
    super();
  }

  ngOnInit() {
  }

  pickPath() {
    this.electronService.dialog.showOpenDialog(this.electronService.remote.BrowserWindow.getFocusedWindow(), {
      defaultPath: this.config.selectedDirectory,
      properties: ['openDirectory']
    }, (paths) => {
      if (paths && paths.length > 0) {
        this.ngZone.run(() => {
          const path = paths[0];
          this.logDebug('Directory selected', path);
          this.directoryService.changePath(path);
        });
      }
    });
  }
}
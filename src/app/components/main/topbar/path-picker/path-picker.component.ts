import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base.component';
import { DirectoryService, DirectoryServiceToken } from 'src/app/interfaces/directory.service';
import { SignalrService, SignalrServiceToken, SignalrStatus } from 'src/app/interfaces/signalr.service';
import { ApiService } from 'src/app/services/api.service';
import { ElectronService } from 'src/app/services/desktop/electron.service';
import { Config } from 'src/config/config';
import { filter, switchMap } from 'rxjs/operators';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { zip } from 'rxjs';

@Component({
  selector: 'app-path-picker',
  templateUrl: './path-picker.component.html'
})
export class PathPickerComponent extends BaseComponent implements OnInit {

  public folderIcon = faFolder;
  public showPathInfo = false;

  constructor(
    private electronService: ElectronService,
    private apiService: ApiService,
    @Inject(SignalrServiceToken) private signalRService: SignalrService,
    @Inject(DirectoryServiceToken) public directoryService: DirectoryService,
    public config: Config
  ) {
    super();
  }

  ngOnInit() {
    this.signalRService.$socketStatus
      .pipe(
        filter(s => s === SignalrStatus.Connected),
        switchMap(s =>
          zip(
            this.directoryService.$changeDetected.pipe(filter(c => c != null)),
            this.directoryService.$status.pipe(filter(ss => ss != null))
          )
        )
      )
      .subscribe(arr => {
        this.apiService.sendStats(arr[0], arr[1].region).subscribe();
      });
  }

  public pickPath() {
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

  public refresh() {
    this.directoryService.refresh();
  }
}

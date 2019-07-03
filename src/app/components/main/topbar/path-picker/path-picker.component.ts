import { Component, Inject, OnInit } from '@angular/core';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { combineLatest, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BaseComponent } from 'src/app/components/base.component';
import { DirectoryService, DirectoryServiceToken } from 'src/app/interfaces/directory.service';
import { SignalrService, SignalrServiceToken, SignalrStatus } from 'src/app/interfaces/signalr.service';
import { ApiService } from 'src/app/services/api.service';
import { ElectronService } from 'src/app/services/desktop/electron.service';
import { Config } from 'src/config/config';

@Component({
  selector: 'app-path-picker',
  templateUrl: './path-picker.component.html'
})
export class PathPickerComponent extends BaseComponent implements OnInit {

  folderIcon = faFolder;
  showPathInfo = false;

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
    let subscribtion: Subscription;

    this.signalRService.$socketStatus.subscribe(s => {
      if (s === SignalrStatus.Connected) {
        subscribtion = combineLatest([
          this.directoryService.$changeDetected.pipe(filter(c => c != null)),
          this.directoryService.$status.pipe(filter(ss => ss != null))
        ]).pipe(this.untilDestroy()).subscribe(arr => {
          this.apiService.sendStats(arr[0], arr[1].region).subscribe();
        });
      } else {
        if (subscribtion) {
          subscribtion.unsubscribe();
        }
      }
    });
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

  refresh() {
    this.directoryService.refresh();
  }
}

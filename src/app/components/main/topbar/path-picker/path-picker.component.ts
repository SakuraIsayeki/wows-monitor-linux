import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base.component';
import { DirectoryService, DirectoryServiceToken } from 'src/app/interfaces/directory.service';
import { SignalrService, SignalrServiceToken, SignalrStatus } from 'src/app/interfaces/signalr.service';
import { ApiService } from 'src/app/services/api.service';
import { ElectronService } from 'src/app/services/desktop/electron.service';
import { Config } from 'src/config/config';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-path-picker',
  templateUrl: './path-picker.component.html'
})
export class PathPickerComponent extends BaseComponent implements OnInit {

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
    this.directoryService.$changeDetected.pipe(filter(obs => obs != null)).subscribe(obj => {
      this.signalRService.$socketStatus.pipe(filter(s => s === SignalrStatus.Connected)).subscribe(() => {
        this.apiService.sendStats(obj).subscribe();
      });
    });
    this.signalRService.$info.subscribe(console.log);
  }

  public do() {
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

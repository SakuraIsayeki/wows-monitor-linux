import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { DialogService } from 'primeng/dynamicdialog';
import { combineLatest, Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { BaseComponent } from 'src/app/components/base.component';
import { DirectoryService, DirectoryServiceToken } from 'src/app/interfaces/directory.service';
import { SignalrService, SignalrServiceToken, SignalrStatus } from 'src/app/interfaces/signalr.service';
import { ApiService } from 'src/app/services/api.service';
import { Config } from 'src/config/config';
import { PathPickerDialogComponent } from './path-picker-dialog/path-picker-dialog.component';

@Component({
  selector: 'app-path-picker',
  templateUrl: './path-picker.component.html'
})
export class PathPickerComponent extends BaseComponent implements OnInit, OnDestroy {

  folderIcon = faFolder;
  showPathInfo = false;

  constructor(
    private dialogService: DialogService,
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
          this.directoryService.$changeDetected,
          this.directoryService.$status.pipe(filter(ss => ss != null))
        ]).pipe(this.untilDestroy()).subscribe(arr => {
          if (arr.length === 2 && arr[0] != null) {
            this.apiService.sendStats(arr[0], arr[1].region).subscribe(undefined, err => {
              this.logError('Error during api call', err);
            });
          } else {
            this.signalRService.resetInfo();
          }
        });
      } else {
        if (subscribtion) {
          subscribtion.unsubscribe();
        }
      }
    });
  }

  openDialog() {
    this.dialogService.open(PathPickerDialogComponent, {
      styleClass: 'dialogPopup desktop',
      header: this.translateService.instant('pathPicker.dialogHeader'),
      showHeader: true,
      dismissableMask: true
    });
  }

  refresh() {
    this.directoryService.refresh();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}

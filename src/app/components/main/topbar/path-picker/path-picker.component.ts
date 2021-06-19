import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { DirectoryService, DirectoryServiceToken } from '@interfaces/directory.service';
import { SignalrStatus } from '@interfaces/signalr';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '@services/api.service';
import { SettingsService } from '@services/settings.service';
import { SignalrService } from '@services/signalr.service';
import { DialogService } from 'primeng/dynamicdialog';
import { combineLatest, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PathPickerDialogComponent } from './path-picker-dialog/path-picker-dialog.component';

@Component({
  selector: 'app-path-picker',
  templateUrl: './path-picker.component.html'
})
export class PathPickerComponent extends BaseComponent implements OnInit, OnDestroy {

  folderIcon = faFolder;
  showPathInfo = false;

  constructor(
    private translateService: TranslateService,
    private dialogService: DialogService,
    private apiService: ApiService,
    private signalrService: SignalrService,
    @Inject(DirectoryServiceToken) public directoryService: DirectoryService,
    public settingsService: SettingsService
  ) {
    super();
  }

  ngOnInit() {
    let subscribtion: Subscription;

    this.signalrService.$socketStatus.subscribe(s => {
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
            this.signalrService.resetInfo();
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
      dismissableMask: true,
      style: {
        maxWidth: '600px'
      }
    });
  }

  refresh() {
    this.directoryService.refresh();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}

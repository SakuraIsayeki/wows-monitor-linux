import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { DirectoryService, DirectoryServiceToken } from '@interfaces/directory.service';
import { ElectronService, ElectronServiceToken } from '@interfaces/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from '@services/settings.service';
import { RegionPipe } from '@shared/pipes/region.pipe';
import { SelectItem } from 'primeng/api';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-path-picker-dialog',
  templateUrl: './path-picker-dialog.component.html'
})
export class PathPickerDialogComponent extends BaseComponent implements OnInit {

  paths = this.settingsService.form.configtoolConfig.clientPaths.model.filter(p => p);
  options: SelectItem[] = [];

  additionalInformation = this.directoryService.$status.pipe(this.untilDestroy(), map(ad => {
    if (!ad) {
      return null;
    }

    return [
      { label: this.translateService.get('pathPicker.additionalInfo.region'), value: new RegionPipe().transform(ad.region) },
      { label: this.translateService.get('pathPicker.additionalInfo.clientVersion'), value: ad.clientVersion },
      { label: this.translateService.get('pathPicker.additionalInfo.folderVersion'), value: ad.folderVersion },
      { label: this.translateService.get('pathPicker.additionalInfo.replaysPathBase'), value: ad.replaysPathBase },
      { label: this.translateService.get('pathPicker.additionalInfo.preferencesPathBase'), value: ad.preferencesPathBase },
      { label: this.translateService.get('pathPicker.additionalInfo.replaysFoldersFound'), value: ad.replaysFoldersFound },
      { label: this.translateService.get('pathPicker.additionalInfo.replaysFolders'), value: ad.replaysFolders?.join('\r\n') }
    ];
  }));

  constructor(
    @Inject(ElectronServiceToken) private electronService: ElectronService,
    @Inject(DirectoryServiceToken) public directoryService: DirectoryService,
    private translateService: TranslateService,
    public settingsService: SettingsService
  ) {
    super();
  }

  ngOnInit() {
    this.setOptions();
  }

  async pickPath() {
    const odr = await this.electronService.showOpenDialog({
      // defaultPath: this.settingsService.form.selectedDirectory.model,
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

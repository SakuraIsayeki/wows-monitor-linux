import { Component, OnInit, Optional } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { SettingsService } from '@services/settings.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-analytics-info',
  templateUrl: './analytics-info.component.html'
})
export class AnalyticsInfoComponent extends BaseComponent implements OnInit {

  constructor(@Optional() public ref: DynamicDialogRef,
              @Optional() private dialogConfig: DynamicDialogConfig,
              private settingsService: SettingsService) {
    super();
  }

  ngOnInit() {
    // this.ref.close();
  }

  click(status: number) {
    if (status === 1) {
      this.settingsService.form.monitorConfig.enableAnalytics.setValue(false);
    } else if (status === 2) {
      this.settingsService.form.monitorConfig.enableAnalytics.setValue(true);
      this.settingsService.form.monitorConfig.anonymIp.setValue(true);
    } else if (status === 3) {
      this.settingsService.form.monitorConfig.enableAnalytics.setValue(true);
      this.settingsService.form.monitorConfig.anonymIp.setValue(false);
    }
    this.settingsService.form.analyticsInfoSeen.setValue(true);
    this.ref.close();
  }

}

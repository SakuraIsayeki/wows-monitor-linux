import { Component, OnInit, Optional } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { BaseComponent } from '../../base.component';
import { Config } from 'src/config/config';

@Component({
  selector: 'app-analytics-info',
  templateUrl: './analytics-info.component.html'
})
export class AnalyticsInfoComponent extends BaseComponent implements OnInit {

  constructor(@Optional() public ref: DynamicDialogRef,
    @Optional() private dialogConfig: DynamicDialogConfig,
    private config: Config) {
    super();
  }

  ngOnInit() {
    // this.ref.close();
  }

  click(status: number) {
    if (status === 1) {
      this.config.enableAnalytics = false;
    } else if (status === 2) {
      this.config.enableAnalytics = true;
      this.config.anonymIp = true;
    } else if (status === 3) {
      this.config.enableAnalytics = true;
      this.config.anonymIp = false;
    }
    this.config.analyticsInfoSeen = true;
    this.config.save();
    this.ref.close();
  }

}

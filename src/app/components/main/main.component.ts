import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/api';
import { ChangelogService } from 'src/app/generated/services';
import { Config } from 'src/config/config';
import { BaseComponent } from '../base.component';
import { AnalyticsInfoComponent } from './analytics-info/analytics-info.component';
import { ChangelogComponent } from './changelogs/changelog/changelog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent extends BaseComponent implements AfterViewInit {

  constructor(private changelogsService: ChangelogService,
    private config: Config,
    private dialogService: DialogService,
    private router: Router) {
    super();
  }

  async ngAfterViewInit() {
    await this.config.waitTillLoaded();
    if (!this.config.analyticsInfoSeen) {
      this.showAnalyticsInfo();
    } else {
      this.showChangelogs();
    }
  }

  showAnalyticsInfo() {
    const ref = this.dialogService.open(AnalyticsInfoComponent, {
      styleClass: 'custom-popup ' + (this.isDesktop ? 'desktop' : 'browser'),
      closable: false,
      header: this.translateService.instant('analytics.dialogHeader'),
    });
    ref.onClose.pipe(this.untilDestroy()).subscribe(() => {
      this.showChangelogs();
    });
  }

  showChangelogs() {
    this.changelogsService.changelogLatest()
      .pipe(this.untilDestroy())
      .subscribe(changelog => {
        if (!this.config.seenChangelogs || !this.config.seenChangelogs.some(id => id == changelog.id)) {
          const ref = this.dialogService.open(ChangelogComponent, {
            styleClass: 'custom-popup ' + (this.isDesktop ? 'desktop' : 'browser'),
            header: this.translateService.instant('changelogs.dialogHeader', { version: changelog.version }),
            data: {
              changelog
            }
          });
          ref.onClose.pipe(this.untilDestroy()).subscribe(() => {
            this.config.pushSeenChangelogs(changelog.id);
            this.config.save();
          });
        }
      });
  }
}

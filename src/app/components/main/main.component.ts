import { AfterViewInit, Component } from '@angular/core';
import { ChangelogService } from '@generated/services';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from '@services/settings.service';
import { DialogService } from 'primeng/dynamicdialog';
import { first } from 'rxjs/operators';
import { BaseComponent } from '../base.component';
import { AnalyticsInfoComponent } from './analytics-info/analytics-info.component';
import { ChangelogComponent } from './changelogs/changelog/changelog.component';

@Component({
  templateUrl: './main.component.html'
})
export class MainComponent extends BaseComponent implements AfterViewInit {

  constructor(
    private translateService: TranslateService,
    private changelogsService: ChangelogService,
    private settingsService: SettingsService,
    private dialogService: DialogService) {
    super();
  }

  async ngAfterViewInit() {
    await this.settingsService.waitForInitialized();
    if (!this.settingsService.form.analyticsInfoSeen.model) {
      this.showAnalyticsInfo();
    } else {
      this.showChangelogs();
    }
  }

  showAnalyticsInfo() {
    const ref = this.dialogService.open(AnalyticsInfoComponent, {
      styleClass: 'custom-popup ' + (this.isDesktop ? 'desktop' : 'browser'),
      closable: false,
      header: this.translateService.instant('analytics.dialogHeader')
    });
    ref.onClose.pipe(this.untilDestroy(), first()).subscribe(() => {
      this.showChangelogs();
    });
  }

  showChangelogs() {
    this.changelogsService.changelogLatest(this.settingsService.form.monitorConfig.allowBeta.model ? { channel: 'beta' } : null)
      .pipe(this.untilDestroy())
      .subscribe(changelog => {
        if (!this.settingsService.form.seenChangelogs.model || !this.settingsService.form.seenChangelogs.model.some(id => id == changelog.id)) {
          const ref = this.dialogService.open(ChangelogComponent, {
            styleClass: 'custom-popup ' + (this.isDesktop ? 'desktop' : 'browser'),
            header: this.translateService.instant('changelogs.dialogHeader', { version: changelog.version }),
            data: {
              changelog
            }
          });
          ref.onClose.pipe(this.untilDestroy()).subscribe(() => {
            this.settingsService.form.seenChangelogs.model.push(changelog.id);
            this.settingsService.form.seenChangelogs.updateValueAndValidity({ emitEvent: true });
          });
        }
      });
  }
}

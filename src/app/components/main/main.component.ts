import { AfterViewInit, Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Config } from 'src/config/config';
import { BaseComponent } from '../base.component';
import { DialogService } from 'primeng/api';
import { ChangelogComponent } from './changelogs/changelog/changelog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent extends BaseComponent implements AfterViewInit {

  constructor(private apiService: ApiService, private config: Config, private dialogService: DialogService) {
    super();
  }

  ngAfterViewInit() {
    this.initChangelogDialog();
  }

  async initChangelogDialog() {
    await this.config.waitTillLoaded();
    this.apiService.changelogLatest()
      .pipe(this.untilDestroy())
      .subscribe(changelog => {
        if (!this.config.seenChangelogs || !this.config.seenChangelogs.some(id => id == changelog.id)) {
          let ref = this.dialogService.open(ChangelogComponent, {
            styleClass: 'custom-popup ' + (this.isDesktop ? 'desktop' : 'browser'),
            header: this.translateService.instant('changelogs.dialogHeader', { version: changelog.version }),
            data: {
              changelog: changelog
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

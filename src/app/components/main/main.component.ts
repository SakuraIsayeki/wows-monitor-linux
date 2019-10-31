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
    this.apiService.changelogLatest()
      .pipe(this.untilDestroy())
      .subscribe(changelog => {
        if (!this.config.seenChangelogs.some(id => id == changelog.id)) {
          this.dialogService.open(ChangelogComponent, {
            styleClass: 'custom-popup ' + (this.isDesktop ? 'desktop' : 'browser'),
            data: {
              changelog: changelog
            }
          })
        }
      });
  }
}

import { Component, Input, OnChanges, OnDestroy, OnInit, Optional, SimpleChanges } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { Subject, Subscription } from 'rxjs';
import { BaseComponent } from 'src/app/components/base.component';
import { Changelog } from 'src/app/interfaces/changelog';
import { ApiService } from 'src/app/services/api.service';
import { Config } from 'src/config/config';

@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.component.html'
})
export class ChangelogComponent extends BaseComponent implements OnChanges, OnDestroy {

  @Input()
  public id: number;

  public changelog: Changelog;

  private changelogSubscription: Subscription;

  constructor(
    @Optional() public ref: DynamicDialogRef,
    @Optional() private dialogConfig: DynamicDialogConfig,
    private apiService: ApiService
  ) {
    super();

    if (this.dialogConfig) {
      this.loadChangelog(this.dialogConfig.data.changelog);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['id'] && changes['id'].currentValue) {
      if (this.changelogSubscription)
        this.changelogSubscription.unsubscribe();

      this.changelogSubscription = this.apiService.changelogDetail(changes['id'].currentValue)
        .pipe(this.untilDestroy())
        .subscribe(c => {
          this.loadChangelog(c);
        });
    }
  }

  private loadChangelog(changelog: Changelog) {
    this.changelog = changelog;
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}

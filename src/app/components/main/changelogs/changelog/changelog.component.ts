import { Component, Input, OnChanges, OnDestroy, Optional, SimpleChanges } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { Subscription } from 'rxjs';
import { BaseComponent } from 'src/app/components/base.component';
import { ChangelogResponse } from 'src/app/generated/models';
import { ChangelogService } from 'src/app/generated/services';

@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.component.html'
})
export class ChangelogComponent extends BaseComponent implements OnChanges, OnDestroy {

  @Input()
  id: number;

  changelog: ChangelogResponse;

  private changelogSubscription: Subscription;

  constructor(
    @Optional() public ref: DynamicDialogRef,
    @Optional() private dialogConfig: DynamicDialogConfig,
    private changelogService: ChangelogService
  ) {
    super();

    if (this.dialogConfig) {
      this.loadChangelog(this.dialogConfig.data.changelog);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.id && changes.id.currentValue) {
      if (this.changelogSubscription) {
        this.changelogSubscription.unsubscribe();
      }

      this.changelogSubscription = this.changelogService.changelogDetail(changes.id.currentValue)
        .pipe(this.untilDestroy())
        .subscribe(c => {
          this.loadChangelog(c);
        });
    }
  }

  private loadChangelog(changelog: ChangelogResponse) {
    this.changelog = changelog;
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}

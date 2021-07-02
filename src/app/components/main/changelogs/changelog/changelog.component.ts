import { Component, Input, OnChanges, OnDestroy, Optional, SimpleChanges } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { ChangelogAppModel } from '@generated/models';
import { ChangelogService } from '@generated/services';
import { BaseComponent } from '@components/base.component';

@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.component.html'
})
export class ChangelogComponent extends BaseComponent implements OnChanges, OnDestroy {

  @Input()
  id: number;

  changelog: ChangelogAppModel;

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

      this.changelogSubscription = this.changelogService.changelogDetail({ id: changes.id.currentValue })
        .pipe(this.untilDestroy())
        .subscribe(c => {
          this.loadChangelog(c);
        });
    }
  }

  private loadChangelog(changelog: ChangelogAppModel) {
    this.changelog = changelog;
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}

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
export class ChangelogComponent extends BaseComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  public id: number;

  public $changelog = new Subject<Changelog>();

  private changelogSubscription: Subscription;

  constructor(
    @Optional() private ref: DynamicDialogRef,
    @Optional() private dialogConfig: DynamicDialogConfig,
    private apiService: ApiService,
    private config: Config
  ) {
    super();
  }

  ngOnInit() {
    if (this.dialogConfig) {
      this.loadChangelog(this.dialogConfig.data.id);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['id']) {
      this.loadChangelog(this.id);
    }
  }

  private loadChangelog(id: number) {
    if (this.changelogSubscription)
      this.changelogSubscription.unsubscribe();

    this.changelogSubscription = this.apiService.changelogDetail(id)
      .pipe(this.untilDestroy())
      .subscribe(c => {
        this.$changelog.next(c);
        this.config.pushSeenChangelogs(c.id);
        this.config.save();
      });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { ApiService } from 'src/app/services/api.service';
import { Changelog } from 'src/app/interfaces/changelog';
import { Subject, BehaviorSubject } from 'rxjs';
import { Config } from 'src/config/config';

interface ChangelogListEntry {
  seen?: boolean;
  changelog?: Changelog
}

@Component({
  selector: 'app-changelogs',
  templateUrl: './changelogs.component.html'
})
export class ChangelogsComponent extends BaseComponent implements OnInit, OnDestroy {

  public $changelogs = new BehaviorSubject<ChangelogListEntry[]>([]);
  public selectedId: number;

  constructor(private apiService: ApiService, private config: Config) {
    super();
  }

  ngOnInit() {
    this.apiService.changelogList()
      .pipe(this.untilDestroy())
      .subscribe(cls => {
        this.$changelogs.next(cls.map(cl => <ChangelogListEntry>{ seen: this.config.seenChangelogs.some(id => cl.id == id), changelog: cl }))
      });
  }

  selectChangelog(changelogListEntry: ChangelogListEntry) {
    this.selectedId = changelogListEntry.changelog.id;
  }

  markAllAsSeen() {
    this.config.pushSeenChangelogs(...this.$changelogs.value.map(c => c.changelog.id));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}

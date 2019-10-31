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
    this.initChangelogs();
  }

  async initChangelogs() {
    await this.config.waitTillLoaded();
    this.apiService.changelogList()
      .pipe(this.untilDestroy())
      .subscribe(cls => {
        if (cls) {
          let clse = cls.map(cl => <ChangelogListEntry>{ seen: this.config.seenChangelogs && this.config.seenChangelogs.some(id => cl.id == id), changelog: cl });
          this.$changelogs.next(clse);
          this.selectChangelog(clse[0]);
        }
      });
  }

  selectChangelog(changelogListEntry: ChangelogListEntry) {
    this.selectedId = changelogListEntry.changelog.id;
    this.config.pushSeenChangelogs(changelogListEntry.changelog.id);
    this.config.save();
  }

  markAllAsSeen() {
    this.config.pushSeenChangelogs(...this.$changelogs.value.map(c => c.changelog.id));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChangelogResponse } from '@generated/models';
import { Config } from '@config/config';
import { BaseComponent } from '@components/base.component';

@Component({
  selector: 'app-changelogs',
  templateUrl: './changelogs.component.html'
})
export class ChangelogsComponent extends BaseComponent implements OnInit, OnDestroy {

  selectedId: number;

  constructor(public route: ActivatedRoute, private config: Config) {
    super();
  }

  ngOnInit() {
    if (this.route.snapshot.data.changelogs) {
      this.selectedId = this.route.snapshot.data.changelogs[0].id;
    }
  }

  isSeen(changelog: ChangelogResponse) {
    return this.config.seenChangelogs && this.config.seenChangelogs.some(id => changelog.id == id)
  }

  selectChangelog(changelog: ChangelogResponse) {
    this.selectedId = changelog.id;
    this.config.pushSeenChangelogs(changelog.id);
    this.config.save();
  }

  markAllAsSeen() {
    this.config.pushSeenChangelogs(...this.route.snapshot.data.changelogs.map(c => c.id));
    this.config.save();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}

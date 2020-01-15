import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Changelog } from 'src/app/interfaces/changelog';
import { Config } from 'src/config/config';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-changelogs',
  templateUrl: './changelogs.component.html'
})
export class ChangelogsComponent extends BaseComponent implements OnInit, OnDestroy {

  public selectedId: number;

  constructor(public route: ActivatedRoute, private config: Config) {
    super();
  }

  ngOnInit() {
    if (this.route.snapshot.data.changelogs) {
      this.selectedId = this.route.snapshot.data.changelogs[0].id;
    }
  }

  isSeen(changelog: Changelog) {
    return this.config.seenChangelogs && this.config.seenChangelogs.some(id => changelog.id == id)
  }

  selectChangelog(changelog: Changelog) {
    this.selectedId = changelog.id;
    this.config.pushSeenChangelogs(changelog.id);
    this.config.save();
  }

  markAllAsSeen() {
    this.config.pushSeenChangelogs(...this.route.snapshot.data.changelogs.map(c => c.id));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}

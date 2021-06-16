import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '@components/base.component';
import { ChangelogResponse } from '@generated/models';
import { SettingsService } from '@services/settings.service';

@Component({
  selector: 'app-changelogs',
  templateUrl: './changelogs.component.html'
})
export class ChangelogsComponent extends BaseComponent implements OnInit, OnDestroy {

  selectedId: number;

  constructor(public route: ActivatedRoute, private settingsService: SettingsService) {
    super();
  }

  ngOnInit() {
    if (this.route.snapshot.data.changelogs) {
      this.selectedId = this.route.snapshot.data.changelogs[0].id;
    }
  }

  isSeen(changelog: ChangelogResponse) {
    return this.settingsService.form.seenChangelogs.value?.some(id => changelog.id == id);
  }

  selectChangelog(changelog: ChangelogResponse) {
    this.selectedId = changelog.id;
    this.settingsService.form.seenChangelogs.model?.push(changelog.id);
  }

  markAllAsSeen() {
    this.settingsService.form.seenChangelogs.model?.push(...this.route.snapshot.data.changelogs.map(c => c.id));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}

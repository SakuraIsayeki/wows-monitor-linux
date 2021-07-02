import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '@components/base.component';
import { ChangelogAppModel } from '@generated/models';
import { SettingsService } from '@services/settings.service';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './changelogs.component.html'
})
export class ChangelogsComponent extends BaseComponent implements OnInit, OnDestroy {

  selectedId: number;
  changelogs = this.route.data.pipe(this.untilDestroy(), map(d => d.changelogs as ChangelogAppModel[]));

  constructor(public route: ActivatedRoute, private settingsService: SettingsService) {
    super();
  }

  ngOnInit() {
    this.changelogs.subscribe(changelogs => {
      this.selectedId = changelogs[0].id;
    });
  }

  isSeen(changelogId: number) {
    return this.settingsService.form.seenChangelogs.value?.some(id => changelogId == id);
  }

  selectChangelog(changelogId: number) {
    this.selectedId = changelogId;
    this.settingsService.form.seenChangelogs.model?.push(changelogId);
  }

  async markAllAsSeen() {
    const changelogs = await this.changelogs.toPromise();
    this.settingsService.form.seenChangelogs.model?.push(...changelogs.map(c => c.id));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}

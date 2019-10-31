import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { ApiService } from 'src/app/services/api.service';
import { Changelog } from 'src/app/interfaces/changelog';
import { Subject, BehaviorSubject } from 'rxjs';
import { Config } from 'src/config/config';

@Component({
  selector: 'app-changelogs',
  templateUrl: './changelogs.component.html'
})
export class ChangelogsComponent extends BaseComponent implements OnInit, OnDestroy {

  public $changelogs = new BehaviorSubject<Changelog[]>([]);
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
          this.$changelogs.next(cls);
          this.selectChangelog(cls[0]);
        }
      });
  }

  isSeen(changelog: Changelog){
    return this.config.seenChangelogs && this.config.seenChangelogs.some(id => changelog.id == id)
  }

  selectChangelog(changelog: Changelog) {
    this.selectedId = changelog.id;
    this.config.pushSeenChangelogs(changelog.id);
    this.config.save();
  }

  markAllAsSeen() {
    this.config.pushSeenChangelogs(...this.$changelogs.value.map(c => c.id));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}

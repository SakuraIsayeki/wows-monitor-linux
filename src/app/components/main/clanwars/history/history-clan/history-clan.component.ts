import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '@components/base.component';
import { faArrowLeft, faRedo } from '@fortawesome/free-solid-svg-icons';
import { ClanInfo } from '@generated/models';
import { CwHistoryListService } from '@services/cw-history-list.service';

@Component({
  selector: 'app-history-clan',
  templateUrl: './history-clan.component.html'
})
export class HistoryClanComponent extends BaseComponent implements OnInit, OnDestroy {

  faRedo = faRedo;
  faLeft = faArrowLeft;

  clan: ClanInfo;

  constructor(
    public service: CwHistoryListService,
    public route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.route.data.pipe(this.untilDestroy()).subscribe(d => this.clan = d.clan);
    this.service.form.season.valueChanges
      .pipe(this.untilDestroy())
      .subscribe(v => {
        if (v) {
          this.router.navigateByUrl(`/clanwars/${this.clan.id}/${v}`);
        } else {
          this.router.navigateByUrl(`/clanwars/${this.clan.id}`);
        }
      });
  }

  back() {
    history.back();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}

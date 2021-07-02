import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '@components/base.component';
import { faArrowLeft, faRedo } from '@fortawesome/free-solid-svg-icons';
import { ClanInfoAppModel } from '@generated/models';
import { CwHistoryListService } from '@services/cw-history-list.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-history-clan',
  templateUrl: './history-clan.component.html'
})
export class HistoryClanComponent extends BaseComponent implements OnInit, OnDestroy {

  faRedo = faRedo;
  faLeft = faArrowLeft;

  routeClan = this.route.data.pipe(map(d => d.clan as ClanInfoAppModel));

  constructor(
    public service: CwHistoryListService,
    public route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    combineLatest([
      this.routeClan,
      this.service.form.season.valueChanges
    ])
      .pipe(this.untilDestroy())
      .subscribe(([clan, seasonId]) => {
        if (seasonId) {
          this.router.navigate(['clanwars', clan.id, seasonId], { state: { skipHistory: true } });
        } else {
          this.router.navigate(['clanwars', clan.id], { state: { skipHistory: true } });
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

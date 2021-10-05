import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '@components/base.component';
import { MatchAppModel } from '@generated/models/match-app-model';
import { TopbarTitleService } from '@services/topbar-title.service';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './match-history-detail.component.html'
})
export class MatchHistoryDetailComponent extends BaseComponent implements OnInit, OnDestroy {

  matchInfo = this.route.data.pipe(map(data => data.match as MatchAppModel));

  constructor(private route: ActivatedRoute,
              private topbarTitleService: TopbarTitleService) {
    super();
    this.matchInfo.pipe(this.untilDestroy()).subscribe(match => topbarTitleService.setMatch(match));
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.topbarTitleService.setMatch(null);
  }
}

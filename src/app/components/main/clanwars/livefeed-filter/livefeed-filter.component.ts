import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base.component';
import { ClanWarsHistoryService } from 'src/app/services/clanwars-history.service';
import { LivefeedService } from 'src/app/services/livefeed.service';
import { ClanwarsComponent } from '../clanwars.component';

@Component({
  selector: 'app-livefeed-filter',
  templateUrl: './livefeed-filter.component.html'
})
export class LivefeedFilterComponent extends BaseComponent implements OnInit, OnDestroy {

  constructor(
    public clanwars: ClanwarsComponent,
    public service: LivefeedService,
    public cwService: ClanWarsHistoryService
  ) {
    super();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}

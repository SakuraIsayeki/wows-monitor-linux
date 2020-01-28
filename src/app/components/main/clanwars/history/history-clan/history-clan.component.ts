import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { BaseComponent } from 'src/app/components/base.component';
import { ClanInfo } from 'src/app/generated/models';
import { ClansService } from 'src/app/generated/services';
import { ClanWarsHistoryService } from 'src/app/services/clanwars-history.service';

@Component({
  selector: 'app-history-clan',
  templateUrl: './history-clan.component.html'
})
export class HistoryClanComponent extends BaseComponent implements OnInit, OnDestroy {

  faRedo = faRedo;

  clan: ClanInfo;

  constructor(
    public service: ClanWarsHistoryService,
    public route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}

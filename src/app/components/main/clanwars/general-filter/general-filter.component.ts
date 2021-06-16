import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { CwHistoryListService } from '@services/cw-history-list.service';
import { ClanwarsComponent } from '../clanwars.component';

@Component({
  selector: 'app-general-filter',
  templateUrl: './general-filter.component.html'
})
export class GeneralFilterComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input()
  isHistory = false;

  @Input()
  isClan = false;

  constructor(
    public clanwars: ClanwarsComponent,
    public service: CwHistoryListService) {
    super();
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}

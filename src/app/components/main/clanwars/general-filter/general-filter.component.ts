import { Component, OnInit, Input, HostBinding, OnDestroy } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { ClanWarsHistoryService } from '@services/clanwars-history.service';
import { ClanwarsComponent } from '../clanwars.component';
import { ApiService } from '@services/api.service';

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
    public service: ClanWarsHistoryService) {
    super();
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}

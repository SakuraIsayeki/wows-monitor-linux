import { Component, OnInit, Input, HostBinding, OnDestroy } from '@angular/core';
import { BaseComponent } from 'src/app/components/base.component';
import { ClanWarsHistoryService } from 'src/app/services/clanwars-history.service';
import { ClanwarsComponent } from '../clanwars.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-general-filter',
  templateUrl: './general-filter.component.html'
})
export class GeneralFilterComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input()
  isHistory = false;

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

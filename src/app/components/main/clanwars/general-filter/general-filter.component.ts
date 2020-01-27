import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from 'src/app/components/base.component';
import { ClanWarsService } from 'src/app/services/clanwars.service';
import { ClanwarsComponent } from '../clanwars.component';

@Component({
  selector: 'app-general-filter',
  templateUrl: './general-filter.component.html'
})
export class GeneralFilterComponent extends BaseComponent implements OnInit {

  @Input()
  isHistory = false;

  constructor(
    public clanwars: ClanwarsComponent,
    public service: ClanWarsService) {
    super();
  }

  ngOnInit() {
  }

}

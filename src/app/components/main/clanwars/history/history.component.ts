import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base.component';
import { ClanWarsHistoryService } from 'src/app/services/clanwars-history.service';
import { faRedo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html'
})
export class HistoryComponent extends BaseComponent implements OnInit {

  faRedo = faRedo;

  constructor(public service: ClanWarsHistoryService) {
    super();
  }

  ngOnInit() {
    this.service.load();
  }

}

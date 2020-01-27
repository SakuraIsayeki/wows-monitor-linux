import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { BaseComponent } from 'src/app/components/base.component';
import { ClanWarsHistoryService } from 'src/app/services/clanwars-history.service';

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
    this.service.form.clanId.setValue(null);
    this.service.load();
  }

}

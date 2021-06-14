import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { BaseComponent } from '@components/base.component';
import { ClanWarsHistoryService } from '@services/clanwars-history.service';
import { Router } from '@angular/router';

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

  clanSelected(clanId: number) {
    if (this.service.form.season.value) {
      this.router.navigateByUrl(`/home/clanwars/${clanId}/${this.service.form.season.value}`);
    } else {
      this.router.navigateByUrl('/home/clanwars/' + clanId);
    }
  }

}

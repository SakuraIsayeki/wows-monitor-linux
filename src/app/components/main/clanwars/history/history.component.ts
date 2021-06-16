import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { CwHistoryListService } from '@services/cw-history-list.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html'
})
export class HistoryComponent extends BaseComponent implements OnInit {

  faRedo = faRedo;

  constructor(public service: CwHistoryListService) {
    super();
  }

  ngOnInit() {
    this.service.form.clanId.setValue(null);
  }

  clanSelected(clanId: number) {
    if (this.service.form.season.value) {
      this.router.navigateByUrl(`/clanwars/${clanId}/${this.service.form.season.value}`);
    } else {
      this.router.navigateByUrl('/clanwars/' + clanId);
    }
  }

}

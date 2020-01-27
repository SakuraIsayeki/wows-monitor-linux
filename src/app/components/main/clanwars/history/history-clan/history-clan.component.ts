import { Component, OnInit, OnDestroy } from '@angular/core';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { BaseComponent } from 'src/app/components/base.component';
import { ClanWarsHistoryService } from 'src/app/services/clanwars-history.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-history-clan',
  templateUrl: './history-clan.component.html'
})
export class HistoryClanComponent extends BaseComponent implements OnInit, OnDestroy {

  faRedo = faRedo;

  constructor(
    public service: ClanWarsHistoryService,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.route.params.pipe(this.untilDestroy()).subscribe(p => {
      this.service.form.clanId.setValue(p.clanId);
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}

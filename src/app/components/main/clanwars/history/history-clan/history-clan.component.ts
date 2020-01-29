import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { BaseComponent } from 'src/app/components/base.component';
import { ClanInfo } from 'src/app/generated/models';
import { ClansService } from 'src/app/generated/services';
import { ClanWarsHistoryService } from 'src/app/services/clanwars-history.service';
import { map, skip } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-history-clan',
  templateUrl: './history-clan.component.html'
})
export class HistoryClanComponent extends BaseComponent implements OnInit, OnDestroy {

  faRedo = faRedo;

  clan: ClanInfo;

  constructor(
    public service: ClanWarsHistoryService,
    public route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.route.data.pipe(this.untilDestroy()).subscribe(d => this.clan = d.clan);
    this.service.form.season.valueChanges
      .pipe(this.untilDestroy())
      .subscribe(v => {
        if (v) {
          this.router.navigateByUrl(`/home/clanwars/${this.clan.id}/${v}`);
        } else {
          this.router.navigateByUrl(`/home/clanwars/${this.clan.id}`);
        }
      });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}

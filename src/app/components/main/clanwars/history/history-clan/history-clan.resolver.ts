import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ClanInfo } from 'src/app/generated/models';
import { ClansService } from 'src/app/generated/services';
import { ClanWarsHistoryService } from 'src/app/services/clanwars-history.service';

@Injectable()
export class HistoryClanResolver implements Resolve<ClanInfo> {
  constructor(private clansService: ClansService, private cwService: ClanWarsHistoryService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ClanInfo | Observable<ClanInfo> | Promise<ClanInfo> {
    this.cwService.form.clanId.setValue(route.params.clanId);
    if (route.params.season) {
      this.cwService.form.season.setValue(parseInt(route.params.season, 0), { emitEvent: false });
    } else {
      this.cwService.form.season.setValue(null, { emitEvent: false });
    }
    return this.clansService.clansDetail({ id: route.params.clanId, seasonId: route.params.season });
  }

}

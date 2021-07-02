import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ClanInfoAppModel } from '@generated/models';
import { ClansService } from '@generated/services';
import { CwHistoryListService } from '@services/cw-history-list.service';
import { Observable } from 'rxjs';

@Injectable()
export class HistoryClanResolver implements Resolve<ClanInfoAppModel> {
  constructor(private clansService: ClansService, private cwService: CwHistoryListService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ClanInfoAppModel | Observable<ClanInfoAppModel> | Promise<ClanInfoAppModel> {
    this.cwService.form.clanId.setValue(route.params.clanId);
    if (route.params.season) {
      this.cwService.form.season.setValue(parseInt(route.params.season, 0), { emitEvent: false });
    } else {
      this.cwService.form.season.setValue(null, { emitEvent: false });
    }
    return this.clansService.clansDetail({ id: route.params.clanId, seasonId: route.params.season });
  }

}

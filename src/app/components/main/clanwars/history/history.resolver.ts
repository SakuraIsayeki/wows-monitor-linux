import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CwClanMatch } from '@generated/models/cw-clan-match';
import { CwHistoryListService } from '@services/cw-history-list.service';
import { IPagedResult } from '@stewie/framework';
import { Observable } from 'rxjs';

@Injectable()
export class HistoryResolver implements Resolve<IPagedResult<CwClanMatch>> {

  constructor(private listService: CwHistoryListService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPagedResult<CwClanMatch>> {
    if (!route.params.clanId && this.listService.form.clanId.value) {
      this.listService.form.clanId.setValue(null);
    }
    if(this.listService.result == null){
      this.listService.primeNgLazyLoad(null);
    }
    return this.listService.getResolveObservable(true);
  }
}

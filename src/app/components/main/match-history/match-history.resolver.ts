import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { MatchListAppModel } from '@generated/models/match-list-app-model';
import { MatchHistoryListService } from '@services/match-history-list.service';
import { IPagedResult } from '@stewie/framework';
import { Observable } from 'rxjs';

@Injectable()
export class MatchHistoryResolver implements Resolve<IPagedResult<MatchListAppModel>> {

  constructor(private listService: MatchHistoryListService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPagedResult<MatchListAppModel>> {
    if (this.listService.result == null) {
      this.listService.primeNgLazyLoad(null);
    }
    return this.listService.getResolveObservable(true);
  }
}

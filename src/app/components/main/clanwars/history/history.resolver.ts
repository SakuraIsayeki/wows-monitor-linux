import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { CwMatchAppModel } from '@generated/models';
import { CwHistoryListService } from '@services/cw-history-list.service';
import { IPagedResult } from '@stewie/framework';
import { Observable, of } from 'rxjs';

@Injectable()
export class HistoryResolver implements Resolve<IPagedResult<CwMatchAppModel>> {

  constructor(private listService: CwHistoryListService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPagedResult<CwMatchAppModel>> {
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras?.state?.skipHistory) {
      return of(this.listService.result);
    }

    if (!route.params.clanId && this.listService.form.clanId.value) {
      this.listService.form.clanId.setValue(null);
    }
    if (this.listService.result == null) {
      this.listService.primeNgLazyLoad(null);
    }
    return this.listService.getResolveObservable(true);
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { MatchAppModel } from '@generated/models/match-app-model';
import { MatchHistoryService } from '@generated/services/match-history.service';
import { Observable } from 'rxjs';

@Injectable()
export class MatchHistoryDetailResolver implements Resolve<MatchAppModel> {

  constructor(private service: MatchHistoryService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MatchAppModel> {
    return this.service.matchHistoryDetail({ id: +route.params.id });
  }
}

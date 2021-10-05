import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { SelectItem } from '@generated/models/select-item';
import { MatchHistoryService } from '@generated/services/match-history.service';
import { Observable } from 'rxjs';

@Injectable()
export class MatchHistoryShipsResolver implements Resolve<SelectItem[]> {
  constructor(private historyService: MatchHistoryService) {

  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SelectItem[]> {
    return this.historyService.matchHistoryShips();
  }
}

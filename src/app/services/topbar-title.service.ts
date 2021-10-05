import { Injectable } from '@angular/core';
import { MatchAppModel } from '@generated/models/match-app-model';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TopbarTitleService {

  private _currentMatch$ = new BehaviorSubject<MatchAppModel>(null);

  public get currentMatch$() {
    return this._currentMatch$.asObservable();
  }

  constructor() {
  }

  public setMatch(match: MatchAppModel) {
    this._currentMatch$.next(match);
  }
}

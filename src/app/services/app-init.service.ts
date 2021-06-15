import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AppInitService {

  private isInitialized = new BehaviorSubject<boolean>(false);
  public isInitialized$ = this.isInitialized.asObservable();

  constructor() {
  }

  public initialized() {
    this.isInitialized.next(true);
  }
}

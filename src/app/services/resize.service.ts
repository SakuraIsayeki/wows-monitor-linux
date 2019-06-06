import { Injectable } from '@angular/core';
import { fromEvent, Observable, Subject, BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Injectable()
export class ResizeService {

  private $resizeSubscription: Subscription;

  _$resizeListener = new BehaviorSubject<number>(0);

  get $resizeListener() {
    return this._$resizeListener.asObservable();
  }

  constructor() {
    if (window && window.innerWidth) {
      this.startListen();
    }
  }

  private startListen() {
    this.$resizeSubscription = fromEvent(window, 'resize')
      .pipe(
        debounceTime(100),
        map(() => {
          return window.innerWidth as number;
        })
      ).subscribe(width => {
        this._$resizeListener.next(window.innerWidth);
      });
  }
}

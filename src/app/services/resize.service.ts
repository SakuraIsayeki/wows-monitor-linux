import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Injectable()
export class ResizeService {

  public $resizeListener: Observable<number>;

  constructor() {
    if (window && window.innerWidth) {
      this.startListen();
    }
  }

  private startListen() {
    this.$resizeListener = fromEvent(window, 'resize')
      .pipe(
        debounceTime(100),
        map(() => {
          return window.innerWidth as number;
        })
      );
  }
}

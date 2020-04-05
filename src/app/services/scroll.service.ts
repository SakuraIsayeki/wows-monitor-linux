import { Injectable } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { skipWhile, first, debounceTime, share } from 'rxjs/operators';

@Injectable()
export class ScrollService {

  private _el: Element;
  private _$onScroll = new Subject<number>();

  get $onScroll() {
    return this._$onScroll.pipe(debounceTime(200), share());
  }

  constructor() {
    interval(200)
      .pipe(skipWhile(() => document.querySelectorAll('main .ui-scrollpanel-content') == null), first())
      .subscribe(() => {
        this._el = document.querySelectorAll('main .ui-scrollpanel-content')[0];
        this._el.addEventListener('scroll', this.callback);
      });
  }

  private callback = () => {
    this._$onScroll.next(this._el.scrollTop);
  }

  scrollTo(scrollTop: number) {
    interval(200)
      .pipe(skipWhile(() => !this._el), first())
      .subscribe(() => {
        this._el.scrollTo({ top: scrollTop, behavior: 'smooth' });
      });
  }

  scrollToAnchor(anchor: string) {
    const anchorEl = document.getElementById(anchor);
    if (anchorEl) {
      this.scrollTo(anchorEl.offsetTop);
    }
  }
}

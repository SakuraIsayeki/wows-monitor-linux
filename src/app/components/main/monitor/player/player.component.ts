import { Component, OnInit, Inject, Input, HostBinding, Sanitizer, SecurityContext } from '@angular/core';
import { BaseComponent } from '../../../base.component';
import { PrPipe } from 'src/app/shared/pipes/pr.pipe';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html'
})
export class PlayerComponent extends BaseComponent implements OnInit {

  @Input()
  player: any;

  @Input()
  cw: boolean;

  @Input()
  @HostBinding('class.last')
  last: boolean;

  @Input()
  @HostBinding('class.first')
  first: boolean;

  @HostBinding('class.me')
  get me() {
    return this.player.relation === 0;
  }

  @HostBinding('style.background-color')
  get backgroundColor() {
    if (this.player.shipStats) {
      return this.sanitizer.sanitize(SecurityContext.STYLE, PrPipe.staticTransform(this.player.shipStats.personalRating) + '33');
    }
    return '';
  }

  @HostBinding('style.border-color')
  get borderColor() {
    if (this.player.shipStats) {
      return this.sanitizer.sanitize(SecurityContext.STYLE, PrPipe.staticTransform(this.player.shipStats.personalRating) + '99');
    }
    return '';
  }

  constructor(private sanitizer: Sanitizer) {
    super();
  }

  ngOnInit() {
  }

}

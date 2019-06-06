import { Component, OnInit, Inject, Input, HostBinding, Sanitizer, SecurityContext } from '@angular/core';
import { BaseComponent } from '../../../base.component';
import { PrPipe } from 'src/app/shared/pipes/pr.pipe';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html'
})
export class PlayerComponent extends BaseComponent implements OnInit {

  @Input()
  public player: any;

  @Input()
  public cw: boolean;

  @Input()
  @HostBinding('class.last')
  public last: boolean;

  @Input()
  @HostBinding('class.first')
  public first: boolean;

  @HostBinding('class.me')
  public get me() {
    return this.player.relation === 0;
  }

  @HostBinding('style.background-color')
  public get backgroundColor() {
    if (this.player.shipStats) {
      return this.sanitizer.sanitize(SecurityContext.STYLE, PrPipe.staticTransform(this.player.shipStats.personalRating) + '33');
    }
    return '';
  }

  @HostBinding('style.border-color')
  public get borderColor() {
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

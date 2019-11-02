import { Component, OnInit, Inject, Input, HostBinding, Sanitizer, SecurityContext, Optional } from '@angular/core';
import { BaseComponent } from '../../../base.component';
import { PrPipe } from 'src/app/shared/pipes/pr.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { Config } from 'src/config/config';
import { WowsNumbersPipe } from 'src/app/shared/pipes/wows-numbers.pipe';
import { ElectronService } from 'src/app/services/desktop/electron.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html'
})
export class PlayerComponent extends BaseComponent implements OnInit {

  @Input()
  player: any;

  @Input()
  @HostBinding('class.cw')
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
    if (this.config.playerBackgrounds && this.player.shipStats) {
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

  constructor(private sanitizer: DomSanitizer, public config: Config, @Optional() private electronService: ElectronService) {
    super();
  }

  ngOnInit() {
  }

  openWowsNumbers(player) {
    const baseUrl = WowsNumbersPipe.staticTransform(player.region);
    const url = `${baseUrl}player/${player.accountId},/`;
    if (this.isBrowser) {
      window.open(url, '_blank');
    } else {
      this.electronService.shell.openExternal(url);
    }
  }
}

import { Component, HostBinding, Input, OnInit, Optional, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ElectronService } from 'src/app/services/desktop/electron.service';
import { WowsNumbersPipe } from 'src/app/shared/pipes/wows-numbers.pipe';
import { Config } from 'src/config/config';
import { BaseComponent } from '../../../base.component';

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
    if (this.player.shipStats && this.config.playerBackgroundsMode === 'background') {
      if (this.config.playerBackgrounds === 'pr') {
        return this.sanitizer.sanitize(SecurityContext.STYLE, this.player.shipStats.personalRatingColor + '28');
      }
      if (this.config.playerBackgrounds === 'wr') {
        return this.sanitizer.sanitize(SecurityContext.STYLE, this.player.shipStats.winrateColor + '28');
      }
      if (this.config.playerBackgrounds === 'accwr') {
        return this.sanitizer.sanitize(SecurityContext.STYLE, this.player.overallStats.winrateColor + '28');
      }
      if (this.config.playerBackgrounds === 'avgDmg') {
        return this.sanitizer.sanitize(SecurityContext.STYLE, this.player.shipStats.averageDamageColor + '28');
      }
    }
    return '';
  }

  @HostBinding('style.border-color')
  get borderColor() {
    if (this.player.shipStats) {
      if (this.config.playerBackgrounds === 'pr') {
        return this.sanitizer.sanitize(SecurityContext.STYLE, this.player.shipStats.personalRatingColor + '99');
      }
      if (this.config.playerBackgrounds === 'wr') {
        return this.sanitizer.sanitize(SecurityContext.STYLE, this.player.shipStats.winrateColor + '99');
      }
      if (this.config.playerBackgrounds === 'accwr') {
        return this.sanitizer.sanitize(SecurityContext.STYLE, this.player.overallStats.winrateColor + '99');
      }
      if (this.config.playerBackgrounds === 'avgDmg') {
        return this.sanitizer.sanitize(SecurityContext.STYLE, this.player.shipStats.averageDamageColor + '99');
      }
    }
    return this.sanitizer.sanitize(SecurityContext.STYLE, '#FFF');
  }

  @HostBinding('class.border-mode')
  get borderModeClass() {
    return this.config.playerBackgroundsMode === 'border';
  }

  constructor(private sanitizer: DomSanitizer, public config: Config, @Optional() private electronService: ElectronService) {
    super();
  }

  ngOnInit() {
  }

  openWowsNumbers(player) {
    const baseUrl = WowsNumbersPipe.staticTransform(player.region);
    const url = `${baseUrl}player/${player.accountId},${player.name}/`;
    if (this.isBrowser) {
      window.open(url, '_blank');
    } else {
      this.electronService.shell.openExternal(url);
    }
  }
}

import { Component, ElementRef, HostBinding, Input, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { faExclamationCircle, faFire, faGavel, faHeart, faLightbulb, faSkull, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { PlayerInfo } from '@generated/models';
import { Config } from '@config/config';
import { BaseComponent } from '@components/base.component';
import { MonitorComponent } from '../monitor.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html'
})
export class PlayerComponent extends BaseComponent implements OnInit {

  @Input()
  @HostBinding('class.mixedKarma')
  get mixedKarma() {
    return this.player.karma + this.player.wowsKarma;
  }

  @Input()
  @HostBinding('class.mixedKarmaColor')
  get mixedKarmaColor(): string {
    if (this.mixedKarma === 0) {
      return 'rgb(255, 199, 31)';
    } else if (this.mixedKarma > 0) {
      return 'rgb(68, 179, 0)';
    } else if (this.mixedKarma < 0) {
      return 'rgb(254, 14, 0)';
    }
  }

  @Input()
  player: PlayerInfo;

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
    if (this.config.playerBackgroundsMode === 'background') {
      if (this.config.playerBackgrounds === 'pr' && this.player.shipStats) {
        return this.sanitizer.sanitize(SecurityContext.STYLE, this.player.shipStats?.personalRatingColor + '28');
      }
      if (this.config.playerBackgrounds === 'wr' && this.player.shipStats?.battles > 0) {
        return this.sanitizer.sanitize(SecurityContext.STYLE, this.player.shipStats?.winrateColor + '28');
      }
      if (this.config.playerBackgrounds === 'accwr' || (this.config.playerBackgrounds === 'wr' && this.player.shipStats?.battles <= 0)) {
        return this.sanitizer.sanitize(SecurityContext.STYLE, this.player.overallStats?.winrateColor + '28');
      }
      if (this.config.playerBackgrounds === 'avgDmg' && this.player.shipStats) {
        return this.sanitizer.sanitize(SecurityContext.STYLE, this.player.shipStats?.averageDamageColor + '28');
      }
    }
    return '';
  }

  @HostBinding('style.border-color')
  get borderColor() {
    if (this.config.playerBackgrounds === 'pr' && this.player.shipStats) {
      return this.sanitizer.sanitize(SecurityContext.STYLE, this.player.shipStats?.personalRatingColor + '99');
    }
    if (this.config.playerBackgrounds === 'wr' && this.player.shipStats?.battles > 0) {
      return this.sanitizer.sanitize(SecurityContext.STYLE, this.player.shipStats?.winrateColor + '99');
    }
    if (this.config.playerBackgrounds === 'accwr' || (this.config.playerBackgrounds === 'wr' && this.player.shipStats?.battles <= 0)) {
      return this.sanitizer.sanitize(SecurityContext.STYLE, this.player.overallStats?.winrateColor + '99');
    }
    if (this.config.playerBackgrounds === 'avgDmg' && this.player.shipStats) {
      return this.sanitizer.sanitize(SecurityContext.STYLE, this.player.shipStats?.averageDamageColor + '99');
    }
    return this.sanitizer.sanitize(SecurityContext.STYLE, '#FFF');
  }

  @HostBinding('class.border-mode')
  get borderModeClass() {
    return this.config.playerBackgroundsMode === 'border';
  }

  faHeart = faHeart;
  faSkull = faSkull;
  faTrophy = faTrophy;
  faFire = faFire;
  faExclamation = faExclamationCircle;
  faBulb = faLightbulb;
  faGavel = faGavel;

  constructor(public el: ElementRef,
              private sanitizer: DomSanitizer,
              public config: Config,
              public monitorComp: MonitorComponent) {
    super();
  }

  ngOnInit() {

  }
}

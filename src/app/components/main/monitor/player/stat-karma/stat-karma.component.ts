import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { StatBaseComponent } from '@components/main/monitor/player/stat-base/stat-base.component';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { StatType } from '@generated/models/stat-type';

@Component({
  selector: 'stat-karma',
  templateUrl: './stat-karma.component.html'
})
export class StatKarmaComponent extends StatBaseComponent implements OnInit {

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

  public icon = faHeart;

  constructor() {
    super(null);
  }

  ngOnInit(): void {
  }

}

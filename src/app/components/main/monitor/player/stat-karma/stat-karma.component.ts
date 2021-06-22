import { Component, OnInit } from '@angular/core';
import { StatBaseComponent } from '@components/main/monitor/player/stat-base/stat-base.component';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { SettingsService } from '@services/settings.service';
import { combineLatest } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';

@Component({
  selector: 'stat-karma',
  templateUrl: './stat-karma.component.html'
})
export class StatKarmaComponent extends StatBaseComponent implements OnInit {

  private karmaSettingObs = this.settings.form.monitorConfig.showWowsKarma.valueChanges.pipe(
    startWith(this.settings.form.monitorConfig.showWowsKarma.value), shareReplay(1));

  public karma$ = this.karmaSettingObs.pipe(
    map(v => {
      if (v) {
        return this.player.karma + this.player.wowsKarma;
      }
      return this.player.karma;
    })
  );

  public karmaColor$ = combineLatest([this.karmaSettingObs, this.karma$]).pipe(
    map(([enabled, karma]) => {
      if (enabled) {
        if (karma === 0) {
          return 'rgb(255, 199, 31)';
        } else if (karma > 0) {
          return 'rgb(68, 179, 0)';
        } else if (karma < 0) {
          return 'rgb(254, 14, 0)';
        }
      }
      return null;
    })
  );

  public icon = faHeart;

  constructor() {
    super(null);
  }

  ngOnInit(): void {
  }

}

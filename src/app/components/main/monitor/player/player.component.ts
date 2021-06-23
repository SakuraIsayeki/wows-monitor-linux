import { Component, ElementRef, Input, OnChanges, OnInit, Optional, SecurityContext, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BaseComponent } from '@components/base.component';
import { PlayerBackgrounds, PlayerBackgroundsMode, PlayerInfo, StatType } from '@generated/models';
import { ScreenshotService } from '@services/desktop/screenshot.service';
import { SettingsService } from '@services/settings.service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';
import { MonitorComponent } from '../monitor.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html'
})
export class PlayerComponent extends BaseComponent implements OnInit, OnChanges {

  @Input()
  playerInput: PlayerInfo;

  @Input()
  cw: boolean;

  @Input()
  last: boolean;

  @Input()
  first: boolean;

  @Input()
  index: number;

  backgroundColor: Observable<string>;
  borderColor: Observable<string>;
  borderEnabled: Observable<boolean>;

  public player$ = new BehaviorSubject<PlayerInfo>(null);
  public config = this.settings.form.monitorConfig.model;

  constructor(public el: ElementRef,
              private sanitizer: DomSanitizer,
              public settings: SettingsService,
              public monitorComp: MonitorComponent,
              @Optional() public screenshotService: ScreenshotService) {
    super();
  }

  ngOnInit() {
    this.initColors();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['playerInput']) {
      this.player$.next(changes['playerInput'].currentValue);
    }
  }

  private initColors() {

    const obs = combineLatest([
      this.settings.form.monitorConfig.playerBackgrounds.valueChanges.pipe(startWith(this.settings.form.monitorConfig.playerBackgrounds.value)),
      this.settings.form.monitorConfig.playerBackgroundsMode.valueChanges.pipe(startWith(this.settings.form.monitorConfig.playerBackgroundsMode.value)),
      this.settings.form.monitorConfig.soloStats.valueChanges.pipe(startWith(this.settings.form.monitorConfig.soloStats.value)),
      this.player$
    ]).pipe(this.untilDestroy(), map(arr => {
      const playerBackgrounds = arr[0];
      const playerBackgroundsMode = arr[1];
      const soloStats = arr[2];
      const player = arr[3];

      const color = this.getColor(playerBackgroundsMode, playerBackgrounds, player, soloStats);

      return {
        background: playerBackgroundsMode === PlayerBackgroundsMode.Background
          ? this.sanitizer.sanitize(SecurityContext.STYLE, color + '28')
          : '',
        border: playerBackgroundsMode === PlayerBackgroundsMode.Border
          ? this.sanitizer.sanitize(SecurityContext.STYLE, color + '99')
          : '#FFF',
        borderEnabled: playerBackgroundsMode === PlayerBackgroundsMode.Border
      };
    }), shareReplay(1));

    this.backgroundColor = obs.pipe(map(d => d.background));
    this.borderColor = obs.pipe(map(d => d.border));
    this.borderEnabled = obs.pipe(map(d => d.borderEnabled));
  }

  private getColor(playerBackgroundsMode: PlayerBackgroundsMode, playerBackgrounds: PlayerBackgrounds, player: PlayerInfo, soloStats: StatType[]) {

    if (playerBackgroundsMode !== PlayerBackgroundsMode.Disabled) {

      const prStats = soloStats.includes(StatType.Pr) ? player.soloShipStats : player.shipStats;
      if (playerBackgrounds === PlayerBackgrounds.Pr && prStats) {
        return prStats?.personalRatingColor;
      }

      const wrStats = soloStats.includes(StatType.Wr) ? player.soloShipStats : player.shipStats;
      if (playerBackgrounds === PlayerBackgrounds.Wr && wrStats?.battles > 0) {
        return wrStats?.winrateColor;
      }

      const accWrStats = soloStats.includes(StatType.AccWr) ? player.soloOverallStats : player.overallStats;
      if (playerBackgrounds === PlayerBackgrounds.AccWr || (playerBackgrounds === PlayerBackgrounds.Wr && wrStats?.battles <= 0)) {
        return accWrStats?.winrateColor;
      }
      const dmgStats = soloStats.includes(StatType.AvgDamage) ? player.soloShipStats : player.shipStats;
      if (playerBackgrounds === PlayerBackgrounds.AvgDmg && dmgStats) {
        return dmgStats?.averageDamageColor;
      }
    }
    return '';
  }
}

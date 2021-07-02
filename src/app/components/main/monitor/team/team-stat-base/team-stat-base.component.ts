import { Component, Input } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { StatType } from '@generated/models/stat-type';
import { TeamAverageAppModel, TeamWinrate } from '@generated/models';
import { SettingsService } from '@services/settings.service';
import { LocatorService } from '@stewie/framework';
import { combineLatest, Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  template: ''
})
export class TeamStatBaseComponent extends BaseComponent {

  @Input()
  public teamAverages: TeamAverageAppModel[];

  private settings: SettingsService;

  public stats: Observable<TeamAverageAppModel>;
  public soloStats: Observable<boolean>;

  public winrates: Observable<{ ship: number, acc: number }>;

  constructor(private statType: StatType) {
    super();
    this.settings = LocatorService.Injector.get(SettingsService) as SettingsService;
    this.soloStats = statType != null ? this.settings.form.monitorConfig.soloStats.valueChanges
      .pipe(startWith(this.settings.form.monitorConfig.soloStats.value), this.untilDestroy(),
        map((statsTypes: StatType[]) => statsTypes.includes(statType))) : of(false);

    this.stats = this.soloStats.pipe(map(val => this.getStats(val)));

    this.winrates = combineLatest([
      this.settings.form.monitorConfig.teamWinrate.valueChanges.pipe(startWith(this.settings.form.monitorConfig.teamWinrate.value)),
      this.stats
    ]).pipe(map(arr => {
      const teamWinrate = arr[0] as TeamWinrate;
      const stats = arr[1] as TeamAverageAppModel;
      if (teamWinrate === TeamWinrate.Weighted) {
        return { ship: stats.weightedShipWinrate, acc: stats.weightedOverallWinrate };
      } else if (teamWinrate === TeamWinrate.Median) {
        return { ship: stats.medianShipWinrate, acc: stats.medianOverallWinrate };
      }
      return { ship: stats.shipWinrate, acc: stats.overallWinrate };
    }));
  }


  ngOnInit(): void {

  }

  private getStats(solo: boolean) {
    if (solo) {
      return this.teamAverages[1];
    } else {
      return this.teamAverages[0];
    }
  }
}

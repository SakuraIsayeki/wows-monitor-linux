import { Component, Inject, InjectionToken, Input, Optional } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { PlayerAppModel, StatsAppModel } from '@generated/models';
import { StatType } from '@generated/models/stat-type';
import { SettingsService } from '@services/settings.service';
import { LocatorService } from '@stewie/framework';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export const SHIPPLACEHOLDERTOKEN = new InjectionToken('ship-placeholder');

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
  template: ''
})
export class StatBaseComponent extends BaseComponent {

  @Input()
  public player: PlayerAppModel;

  @Input()
  public cw: boolean;

  protected settings: SettingsService;

  public stats: Observable<StatsAppModel>;
  public soloStats: Observable<boolean>;

  constructor(private statType: StatType, @Inject(SHIPPLACEHOLDERTOKEN) @Optional() private ship = false) {
    super();
    this.settings = LocatorService.Injector.get(SettingsService) as SettingsService;
    this.soloStats = statType != null ? this.settings.form.monitorConfig.soloStats.valueChanges
      .pipe(startWith(this.settings.form.monitorConfig.soloStats.value), this.untilDestroy(),
        map((statsTypes: StatType[]) => statsTypes.includes(statType))) : of(false);

    this.stats = this.soloStats.pipe(map(val => this.getStats(val)));
  }

  ngOnInit(): void {

  }

  private getStats(solo: boolean) {
    if (this.ship && solo) {
      return this.player.soloShipStats;
    } else if (this.ship && !solo) {
      return this.player.shipStats;
    } else if (!this.ship && solo) {
      return this.player.soloOverallStats;
    } else {
      return this.player.overallStats;
    }
  }
}

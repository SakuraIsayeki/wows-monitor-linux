import { Inject, Injectable, Injector } from '@angular/core';
import { LoggerService, LoggerServiceToken } from '@interfaces/logger.service';
import { GatewayService } from '@services/gateway.service';
import { SettingsService } from '@services/settings.service';
import { BehaviorSubject, interval, Observable, of, Subscription } from 'rxjs';
import { filter, last, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { Arenainfo, MatchGroup, Region, Relation } from '../generated/models';
import { StatsService } from '../generated/services';

@Injectable()
export class ApiService {

  lastInfo: string;
  lastHash: string;
  static lastRegion: Region;
  private dateRegex = new RegExp('(\\d{2})\\.(\\d{2})\\.(\\d{4})\\s(\\d{2})\\:(\\d{2})\\:(\\d{2})', 'g');
  private _refreshTimeout$ = new BehaviorSubject(31);
  private refreshSubscription: Subscription;

  public get refreshTimeout$() {
    return this._refreshTimeout$.pipe(map(x => x > 30 ? -1 : 30 - x));
  }

  constructor(private statsService: StatsService, private settingsService: SettingsService,
              @Inject(LoggerServiceToken) private logger: LoggerService,
              private injector: Injector) {
  }

  refreshStats() {
    if(this.refreshSubscription && this._refreshTimeout$.value < 30){
      return of();
    }
    this.refreshSubscription?.unsubscribe();
    this.refreshSubscription = interval(1000).subscribe(x => this._refreshTimeout$.next(x));
    const gateway = this.injector.get(GatewayService) as GatewayService;
    return gateway.info$.pipe(filter(m => m != null), switchMap(m => {
      const name = m.friendly.find(v => v.relation === Relation.Self).name;
      return this.statsService.statsRefreshStats({ matchId: m.id, token: this.settingsService.form.signalRToken.value, accountName: name });
    }));
  }

  resendState() {
    this.sendStats(this.lastInfo, ApiService.lastRegion, true).subscribe();
  }

  sendStats(tempArenaInfoJson: string, region: Region, force = false) {
    this.lastInfo = tempArenaInfoJson;
    ApiService.lastRegion = region;
    const tempArenaInfo = JSON.parse(tempArenaInfoJson) as Arenainfo;
    const hash = this.createHash(tempArenaInfo);
    if (!force && hash === this.lastHash) {
      return of();
    }

    this.lastHash = hash;
    if (this.settingsService.form.forcePVP.value) {
      tempArenaInfo.useMatchGroup = MatchGroup.PVP;
    }
    if (tempArenaInfo == null) {
      this.logger.error('StatsService', 'Error when reading tempArenaInfo. It\'s empty');
      return of(null);
    }
    tempArenaInfo.token = this.settingsService.form.signalRToken.value;
    tempArenaInfo.dateTime = new Date(tempArenaInfo.dateTime.replace(this.dateRegex, '$3-$2-$1T$4:$5:$6')).toJSON();
    return this.statsService.statsSendStats({ body: tempArenaInfo });
  }

  private createHash(info: Arenainfo): string {
    return info.vehicles
      .filter(v => v.relation !== Relation.Self)
      .map(v => v.name)
      .sort().join();
  }
}

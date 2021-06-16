import { Inject, Injectable } from '@angular/core';
import { LoggerService, LoggerServiceToken } from '@interfaces/logger.service';
import { SettingsService } from '@services/settings.service';
import { of } from 'rxjs';
import { MatchGroup, Region, Relation, TempArenaInfo } from '../generated/models';
import { StatsService } from '../generated/services';

@Injectable()
export class ApiService {

  lastInfo: string;
  lastHash: string;
  static lastRegion: Region;

  constructor(private statsService: StatsService, private settingsService: SettingsService, @Inject(LoggerServiceToken) private logger: LoggerService) {
  }

  resendState() {
    this.sendStats(this.lastInfo, ApiService.lastRegion, true).subscribe();
  }

  sendStats(tempArenaInfoJson: string, region: Region, force = false) {
    this.lastInfo = tempArenaInfoJson;
    ApiService.lastRegion = region;
    const tempArenaInfo = JSON.parse(tempArenaInfoJson) as TempArenaInfo;
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
    return this.statsService.statsSendStats({ token: this.settingsService.form.signalRToken.value, body: tempArenaInfo });
  }

  private createHash(info: TempArenaInfo): string {
    return info.vehicles
      .filter(v => v.relation !== Relation.Self)
      .map(v => v.name)
      .sort().join();
  }
}

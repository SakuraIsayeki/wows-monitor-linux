import { Injectable } from '@angular/core';
import { Config } from 'src/config/config';
import { MatchGroup, Region, TempArenaInfo } from '../generated/models';
import { StatsService } from '../generated/services';

@Injectable()
export class ApiService {

  mode = MatchGroup.PVP;
  lastInfo: string;
  static lastRegion: Region;

  constructor(private statsService: StatsService, private config: Config) { }

  resendState() {
    this.sendStats(this.lastInfo, ApiService.lastRegion).subscribe();
  }

  sendStats(tempArenaInfoJson: string, region: Region) {
    this.lastInfo = tempArenaInfoJson;
    ApiService.lastRegion = region;
    const tempArenaInfo = JSON.parse(tempArenaInfoJson) as TempArenaInfo;
    tempArenaInfo.matchGroup = this.mode;
    return this.statsService.statsSendStats({ token: this.config.signalRToken, body: tempArenaInfo });
  }
}

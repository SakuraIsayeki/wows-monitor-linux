/* tslint:disable */
/* eslint-disable */
import { ClanInfoAppModel } from './clan-info-app-model';
import { MapAppModel } from './map-app-model';
import { MatchGroup } from './match-group';
import { PlayerAppModel } from './player-app-model';
import { Region } from './region';
import { TeamAverageAppModel } from './team-average-app-model';
export interface MatchAppModel {
  clanSeasonId?: null | number;
  clanSeasonName?: null | string;
  date?: string;
  enemy?: null | Array<PlayerAppModel>;
  enemyClan?: null | ClanInfoAppModel;
  enemyTeam?: null | TeamAverageAppModel;
  enemyTeamSolo?: null | TeamAverageAppModel;
  friendly?: null | Array<PlayerAppModel>;
  friendlyClan?: null | ClanInfoAppModel;
  friendlyTeam?: null | TeamAverageAppModel;
  friendlyTeamSolo?: null | TeamAverageAppModel;
  history?: boolean;
  id?: number;
  map?: null | MapAppModel;
  mapId?: number;
  matchGroup?: MatchGroup;
  rankedSeason?: null | number;
  rankedSeasonName?: null | string;
  refreshed?: boolean;
  region?: Region;
}


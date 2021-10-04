/* tslint:disable */
/* eslint-disable */
import { MapAppModel } from './map-app-model';
import { MatchGroup } from './match-group';
import { Region } from './region';
export interface MatchListAppModel {
  clanSeasonId?: null | number;
  clanSeasonName?: null | string;
  date?: string;
  id?: number;
  map?: null | MapAppModel;
  mapId?: number;
  matchGroup?: MatchGroup;
  notEligable?: boolean;
  rankedSeason?: null | number;
  rankedSeasonName?: null | string;
  region?: Region;
}


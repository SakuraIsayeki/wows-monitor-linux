/* tslint:disable */
/* eslint-disable */
import { ArenaInfoVehicle } from './arena-info-vehicle';
import { MatchGroup } from './match-group';
import { Region } from './region';
export interface Arenainfo {
  dateTime?: string;
  mapId?: number;
  matchGroup?: MatchGroup;
  playerId?: number;
  region?: Region;
  token?: null | string;
  useMatchGroup?: null | MatchGroup;
  vehicles?: null | Array<ArenaInfoVehicle>;
}


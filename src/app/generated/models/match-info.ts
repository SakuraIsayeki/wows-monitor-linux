/* tslint:disable */
import { ClanInfo } from './clan-info';
import { MapInfo } from './map-info';
import { MatchGroup } from './match-group';
import { PlayerInfo } from './player-info';
import { TeamAverage } from './team-average';
export interface MatchInfo {
  clanwarsSeason?: null | number;
  enemy?: null | Array<PlayerInfo>;
  enemyClan?: null | ClanInfo;
  enemyTeam?: null | TeamAverage;
  friendly?: null | Array<PlayerInfo>;
  friendlyClan?: null | ClanInfo;
  friendlyTeam?: null | TeamAverage;
  map?: null | MapInfo;
  matchGroup?: MatchGroup;
  rankedSeason?: null | number;
  rankedSeasonName?: null | string;
}

/* tslint:disable */
import { Clan } from './clan';
import { Region } from './region';
import { Relation } from './relation';
import { ShipInfo } from './ship-info';
import { Stats } from './stats';
export interface PlayerInfo {
  accountId?: number;
  bot?: boolean;
  clan?: null | Clan;
  hidden?: boolean;
  karma?: null | number;
  name?: null | string;
  overallStats?: null | Stats;
  region?: Region;
  relation?: Relation;
  shipInfo?: null | ShipInfo;
  shipStats?: null | Stats;
}

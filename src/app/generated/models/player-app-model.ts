/* tslint:disable */
/* eslint-disable */
import { PlayerAccountAppModel } from './player-account-app-model';
import { Region } from './region';
import { Relation } from './relation';
import { ShipAppModel } from './ship-app-model';
import { StatsAppModel } from './stats-app-model';
export interface PlayerAppModel {
  account?: null | PlayerAccountAppModel;
  accountId?: number;
  bot?: boolean;
  clanColor?: null | string;
  clanId?: null | number;
  clanTag?: null | string;
  hidden?: boolean;
  karma?: null | number;
  name?: null | string;
  overallStats?: null | StatsAppModel;
  region?: Region;
  relation?: Relation;
  shipInfo?: null | ShipAppModel;
  shipStats?: null | StatsAppModel;
  soloOverallStats?: null | StatsAppModel;
  soloShipStats?: null | StatsAppModel;
  wowsKarma?: null | number;
}


/* tslint:disable */
/* eslint-disable */
import { BaseListRequestOfClanMatch } from './base-list-request-of-clan-match';
import { ClanLeague } from './clan-league';
import { Region } from './region';
export interface HistoryListRequest extends BaseListRequestOfClanMatch {
  clanId?: null | number;
  clanIds?: null | Array<number>;
  divisions?: null | Array<number>;
  filterClanIds?: boolean;
  leagues?: null | Array<ClanLeague>;
  regions?: null | Array<Region>;
  season?: null | number;
  team?: null | number;
}


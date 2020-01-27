/* tslint:disable */
import { ClanLeague } from './clan-league';
import { ListRequest } from './list-request';
import { Region } from './region';
export interface HistoryListRequest extends ListRequest {
  clanId?: null | number;
  clanIds?: null | Array<number>;
  divisions?: null | Array<number>;
  filterClanIds?: boolean;
  leagues?: null | Array<ClanLeague>;
  regions?: null | Array<Region>;
  season?: null | number;
  team?: null | number;
}

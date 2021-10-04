/* tslint:disable */
/* eslint-disable */
import { BaseListRequestOfMatch } from './base-list-request-of-match';
import { MatchGroup } from './match-group';
export interface MatchListRequest extends BaseListRequestOfMatch {
  dateRange?: null | Array<string>;
  mapId?: null | number;
  matchGroup?: null | MatchGroup;
}


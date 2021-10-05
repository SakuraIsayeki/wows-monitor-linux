/* tslint:disable */
/* eslint-disable */
import { BaseListRequestOfMatch } from './base-list-request-of-match';
import { MatchGroup } from './match-group';
import { Region } from './region';
export interface MatchListRequest extends BaseListRequestOfMatch {
  end?: null | string;
  mapIds?: null | Array<number>;
  matchGroups?: null | Array<MatchGroup>;
  region?: null | Region;
  shipIds?: null | Array<number>;
  start?: null | string;
}


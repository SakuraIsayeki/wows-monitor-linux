/* tslint:disable */
/* eslint-disable */
import { ClanLeague } from './clan-league';
import { RatingTeam } from './rating-team';
import { Region } from './region';
export interface CwHistoryEntryAppModel {
  color?: null | string;
  date?: string;
  division?: number;
  divisionRating?: number;
  divisionRatingDiff?: null | number;
  globalRank?: number;
  globalRankDiff?: null | number;
  league?: ClanLeague;
  plannedPrimeTime?: null | number;
  primeTime?: null | number;
  publicRating?: number;
  publicRatingDiff?: null | number;
  realm?: Region;
  regionRank?: number;
  regionRankDiff?: null | number;
  seasonId?: number;
  stageProgress?: null | Array<number>;
  stageTarget?: null | number;
  stageTargetDivision?: null | number;
  stageTargetLeague?: null | ClanLeague;
  stageType?: null | number;
  team?: RatingTeam;
}


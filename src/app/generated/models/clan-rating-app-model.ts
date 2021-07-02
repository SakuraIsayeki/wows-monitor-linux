/* tslint:disable */
/* eslint-disable */
import { ClanLeague } from './clan-league';
import { RatingTeam } from './rating-team';
export interface ClanRatingAppModel {
  battlesCount?: number;
  color?: null | string;
  currentWinningStreak?: number;
  division?: number;
  globalRank?: number;
  league?: ClanLeague;
  longestWinningStreak?: number;
  publicRating?: number;
  rank?: number;
  seasonId?: number;
  teamNumber?: RatingTeam;
  winsCount?: number;
}


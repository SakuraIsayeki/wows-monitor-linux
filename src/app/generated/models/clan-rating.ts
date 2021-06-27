/* tslint:disable */
/* eslint-disable */
import { ClanLeague } from './clan-league';
import { ClanStage } from './clan-stage';
export interface ClanRating {
  battlesCount?: number;
  color?: null | string;
  currentWinningStreak?: number;
  division?: number;
  globalRank?: number;
  isBestSeasonRating?: boolean;
  league?: ClanLeague;
  longestWinningStreak?: number;
  publicRating?: number;
  rank?: number;
  seasonId?: number;
  stage?: null | ClanStage;
  teamNumber?: number;
  winsCount?: number;
}


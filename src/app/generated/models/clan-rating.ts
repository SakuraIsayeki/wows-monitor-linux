/* tslint:disable */
import { ClanLeague } from './clan-league';
import { ClanStage } from './clan-stage';
export interface ClanRating {
  battles?: number;
  bestSeasonRating?: boolean;
  currentWinningStreak?: number;
  division?: number;
  globalRank?: number;
  league?: ClanLeague;
  longestWinningStreak?: number;
  rank?: number;
  rating?: number;
  seasonId?: number;
  stage?: null | ClanStage;
  team?: number;
  wins?: number;
}

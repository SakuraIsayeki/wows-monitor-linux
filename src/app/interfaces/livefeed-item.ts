import { Region } from './region';

export interface LivefeedItem {
  winnerClanId: number;
  winnerDivision: number;
  winnerLeague: number;
  winnerRegion: number;

  looserClanId: number;
  looserDivision: number;
  looserLeague: number;
  looserRegion: number;

  clanMatch: any;
}

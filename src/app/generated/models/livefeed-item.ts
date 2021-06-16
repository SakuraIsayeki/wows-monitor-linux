/* tslint:disable */
/* eslint-disable */
import { ClanLeague } from './clan-league';
import { CwClanMatch } from './cw-clan-match';
import { Region } from './region';
export interface LivefeedItem {
  clanMatch?: null | CwClanMatch;
  looserClanId?: null | number;
  looserDivision?: null | number;
  looserLeague?: null | ClanLeague;
  looserRegion?: null | Region;
  winnerClanId?: null | number;
  winnerDivision?: null | number;
  winnerLeague?: null | ClanLeague;
  winnerRegion?: null | Region;
}


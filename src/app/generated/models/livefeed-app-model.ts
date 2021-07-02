/* tslint:disable */
/* eslint-disable */
import { CwMatchAppModel } from './cw-match-app-model';
import { ClanLeague } from './clan-league';
import { Region } from './region';
export interface LivefeedAppModel {
  clanMatch?: null | CwMatchAppModel;
  looserClanId?: null | number;
  looserDivision?: null | number;
  looserLeague?: null | ClanLeague;
  looserRegion?: null | Region;
  winnerClanId?: null | number;
  winnerDivision?: null | number;
  winnerLeague?: null | ClanLeague;
  winnerRegion?: null | Region;
}


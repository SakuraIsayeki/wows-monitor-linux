/* tslint:disable */
/* eslint-disable */
import { CwClanAppModel } from './cw-clan-app-model';
import { CwHistoryEntryAppModel } from './cw-history-entry-app-model';
import { Region } from './region';
export interface CwMatchAppModel {
  date?: string;
  estimated?: boolean;
  looser?: null | CwClanAppModel;
  looserEntry?: null | CwHistoryEntryAppModel;
  looserId?: null | number;
  plannedPrimeTime?: null | number;
  primeTime?: null | number;
  realm?: Region;
  season?: number;
  winner?: null | CwClanAppModel;
  winnerEntry?: null | CwHistoryEntryAppModel;
  winnerId?: null | number;
}


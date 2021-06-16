/* tslint:disable */
/* eslint-disable */
import { CwClan } from './cw-clan';
import { CwHistoryEntry } from './cw-history-entry';
import { Region } from './region';
export interface CwClanMatch {
  date?: string;
  estimated?: boolean;
  looser?: null | CwClan;
  looserEntry?: null | CwHistoryEntry;
  looserId?: null | number;
  plannedPrimeTime?: null | number;
  primeTime?: null | number;
  realm?: Region;
  season?: number;
  winner?: null | CwClan;
  winnerEntry?: null | CwHistoryEntry;
  winnerId?: null | number;
}


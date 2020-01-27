/* tslint:disable */
import { CwClan } from './cw-clan';
import { CwHistoryEntry } from './cw-history-entry';
export interface CwClanMatch {
  date?: string;
  estimated?: boolean;
  looser?: null | CwClan;
  looserEntry?: null | CwHistoryEntry;
  looserId?: null | number;
  primeTime?: null | number;
  season?: number;
  winner?: null | CwClan;
  winnerEntry?: null | CwHistoryEntry;
  winnerId?: null | number;
}

/* tslint:disable */
/* eslint-disable */
import { ClanLeague } from './clan-league';
export interface ClanStage {
  progress?: null | Array<number>;
  target?: null | number;
  targetDivision?: null | number;
  targetLeague?: null | ClanLeague;
  type?: null | number;
}


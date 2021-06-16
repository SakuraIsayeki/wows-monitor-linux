/* tslint:disable */
/* eslint-disable */
import { ClanLeague } from './clan-league';
import { Region } from './region';
export interface ClanWarsConfig {
  divisions?: null | Array<number>;
  favClanIds?: null | Array<number>;
  leagues?: null | Array<ClanLeague>;
  onlyShowFavs?: null | boolean;
  regions?: null | Array<Region>;
  season?: null | number;
}


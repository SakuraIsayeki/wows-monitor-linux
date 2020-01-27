/* tslint:disable */
import { ClanRating } from './clan-rating';
import { Region } from './region';
export interface ClanInfo {
  alphaRating?: null | ClanRating;
  bravoRating?: null | ClanRating;
  color?: null | string;
  id?: number;
  leadingRating?: null | ClanRating;
  name?: null | string;
  rank?: number;
  region?: Region;
  tag?: null | string;
}

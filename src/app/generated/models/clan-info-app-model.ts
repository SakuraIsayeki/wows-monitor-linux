/* tslint:disable */
/* eslint-disable */
import { ClanRatingAppModel } from './clan-rating-app-model';
import { Region } from './region';
export interface ClanInfoAppModel {
  alphaRating?: null | ClanRatingAppModel;
  bravoRating?: null | ClanRatingAppModel;
  color?: null | string;
  id?: number;
  leadingRating?: null | ClanRatingAppModel;
  name?: null | string;
  rank?: number;
  region?: Region;
  tag?: null | string;
}


/* tslint:disable */
/* eslint-disable */
import { PatreonTier } from './patreon-tier';
import { Region } from './region';
import { UserInfoResult } from './user-info-result';
export interface CustomUserInfoResult extends UserInfoResult {
  patreonTier?: null | PatreonTier;
  region?: Region;
  syncSettings?: boolean;
  uuid?: null | string;
}


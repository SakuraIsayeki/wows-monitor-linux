/* tslint:disable */
/* eslint-disable */
import { Region } from './region';
import { UserInfoResult } from './user-info-result';
export interface CustomUserInfoResult extends UserInfoResult {
  region?: Region;
  syncSettings?: boolean;
}


/* tslint:disable */
/* eslint-disable */
import { PatreonTier } from './patreon-tier';
import { ProfileDevice } from './profile-device';
import { ProfileWgAccountAppModel } from './profile-wg-account-app-model';
export interface ProfileAppModel {
  devices?: null | Array<ProfileDevice>;
  name?: null | string;
  patreonConnected?: boolean;
  patreonName?: null | string;
  patreonTier?: null | PatreonTier;
  requiresPatreonRefresh?: boolean;
  syncSettings?: null | boolean;
  wargamingAccounts?: null | Array<ProfileWgAccountAppModel>;
}


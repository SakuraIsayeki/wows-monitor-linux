/* tslint:disable */
/* eslint-disable */
import { ProfileDevice } from './profile-device';
import { ProfileWgAccountAppModel } from './profile-wg-account-app-model';
export interface ProfileAppModel {
  devices?: null | Array<ProfileDevice>;
  name?: null | string;
  syncSettings?: null | boolean;
  wargamingAccounts?: null | Array<ProfileWgAccountAppModel>;
}


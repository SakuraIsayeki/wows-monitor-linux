/* tslint:disable */
/* eslint-disable */
import { ClanWarsConfig } from './clan-wars-config';
import { ConfigtoolConfig } from './configtool-config';
import { LivefeedConfig } from './livefeed-config';
import { MonitorConfig } from './monitor-config';
export interface AppConfig {
  analyticsInfoSeen?: null | boolean;
  clanWarsConfig?: null | ClanWarsConfig;
  configtoolConfig?: null | ConfigtoolConfig;
  forcePVP?: null | boolean;
  lastSave?: null | string;
  livefeedConfig?: null | LivefeedConfig;
  mainClient?: null | string;
  monitorConfig?: null | MonitorConfig;
  seenChangelogs?: null | Array<number>;
  selectedDirectory?: null | string;
  signalRToken?: null | string;
  uuid?: string;
}


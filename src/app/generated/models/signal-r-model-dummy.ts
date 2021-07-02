/* tslint:disable */
/* eslint-disable */
import { GatewaySettings } from './gateway-settings';
import { GatewayStatus } from './gateway-status';
import { LivefeedAppModel } from './livefeed-app-model';
export interface SignalRModelDummy {
  gatewayStatus?: GatewayStatus;
  livefeed?: null | LivefeedAppModel;
  settings?: null | GatewaySettings;
}


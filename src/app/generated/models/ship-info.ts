/* tslint:disable */
import { WgShipType } from './wg-ship-type';
export interface ShipInfo {
  id?: number;
  name?: null | string;
  testship?: boolean;
  tier?: number;
  type?: WgShipType;
}

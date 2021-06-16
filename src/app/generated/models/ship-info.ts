/* tslint:disable */
/* eslint-disable */
import { ShipType } from './ship-type';
export interface ShipInfo {
  id?: number;
  name?: null | string;
  testship?: boolean;
  tier?: number;
  type?: ShipType;
}


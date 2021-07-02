/* tslint:disable */
/* eslint-disable */
import { ShipTier } from './ship-tier';
import { ShipType } from './ship-type';
export interface ShipAppModel {
  id?: number;
  name?: null | string;
  testship?: boolean;
  tier?: ShipTier;
  type?: ShipType;
}


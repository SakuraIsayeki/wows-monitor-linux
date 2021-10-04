/* tslint:disable */
/* eslint-disable */
import { SortOrder } from './sort-order';
export interface BaseListRequestOfMatch {
  page?: number;
  pageSize?: number;
  sortColumn?: null | string;
  sortDirection?: SortOrder;
}


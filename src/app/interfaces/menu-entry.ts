import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface MenuEntry {
  key: string;
  routerLink?: string;
  external?: string;
  icon?: IconDefinition;
  desktop?: boolean;
  browser?: boolean;
}

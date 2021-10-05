import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Observable } from 'rxjs';

export interface MenuEntry {
  key: string;
  routerLink?: string;
  external?: string;
  icon?: IconDefinition;
  desktop?: boolean;
  browser?: boolean;
  badge?: Observable<boolean>;
  badgeCount?: Observable<number>;
  requireAuth?: boolean;
}

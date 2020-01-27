import { FormControl } from '@angular/forms';
import { ClanWarsConfig, ClanWarsForm } from './clanwars-config';
import { ListRequest } from './list-request';
import { Region } from './region';

export interface HistoryListRequest extends ListRequest {
  clanId?: number;
  clanIds?: number[];
  filterClanIds?: boolean;
  regions?: Region[];
  leagues?: number[];
  divisions?: number[];
  season?: number;
}

export class HistoryListRequestForm extends ClanWarsForm {

  constructor(config: ClanWarsConfig) {
    super(config);

    this.addControl('clanId', new FormControl(null));
    this.addControl('page', new FormControl(1));
    this.addControl('pageSize', new FormControl(25));
  }

  get clanId() {
    return this.get('clanId');
  }

  get page() {
    return this.get('page');
  }

  get pageSize() {
    return this.get('pageSize');
  }

  getRequestModel(): HistoryListRequest {
    return {
      clanId: this.clanId.value,
      clanIds: this.favClanIds.value,
      filterClanIds: this.onlyShowFavs.value,
      regions: this.region.value,
      divisions: this.division.value,
      leagues: this.league.value,
      season: this.season.value,
      page: this.page.value,
      pageSize: this.pageSize.value
    }
  }
}

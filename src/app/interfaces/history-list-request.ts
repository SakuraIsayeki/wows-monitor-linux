import { FormControl } from '@angular/forms';
import { HistoryListRequest } from '../generated/models';
import { ClanWarsConfig, ClanWarsForm } from './clanwars-config';

export class HistoryListRequestForm extends ClanWarsForm {

  constructor(config: ClanWarsConfig) {
    super(config);

    this.addControl('clanId', new FormControl(null));
    this.addControl('team', new FormControl(null));
    this.addControl('page', new FormControl(1));
    this.addControl('pageSize', new FormControl(25));
  }

  get clanId() {
    return this.get('clanId');
  }

  get team() {
    return this.get('team');
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
      team: this.team.value,
      clanIds: this.favClanIds.value,
      filterClanIds: this.onlyShowFavs.value,
      regions: this.region.value,
      divisions: this.division.value,
      leagues: this.league.value,
      season: this.season.value,
      page: this.page.value,
      pagesize: this.pageSize.value
    };
  }
}

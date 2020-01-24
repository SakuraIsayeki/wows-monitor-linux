import { FormControl, FormGroup } from '@angular/forms';
import { Region } from './region';

export interface ClanWarsConfig {
  favClanIds?: number[];
  onlyShowFavs?: boolean;
  league?: number;
  division?: number;
  region?: Region;
  season?: number;
}

export const defaultClanWarsConfig: ClanWarsConfig = {
  favClanIds: [],
  onlyShowFavs: false,
  league: null,
  division: null,
  region: null
}

export class ClanWarsForm extends FormGroup {
  constructor(config: ClanWarsConfig) {
    super({});

    this.addControl('favClanIds', new FormControl(config.favClanIds));
    this.addControl('onlyShowFavs', new FormControl(config.onlyShowFavs));
    this.addControl('league', new FormControl(config.league));
    this.addControl('division', new FormControl(config.division));
    this.addControl('region', new FormControl(config.region));
    this.addControl('season', new FormControl(config.season));
  }

  get model() {
    return {
      favClanIds: this.favClanIds.value,
      onlyShowFavs: this.onlyShowFavs.value,
      league: this.league.value,
      division: this.division.value,
      region: this.region.value,
    } as ClanWarsConfig;
  }

  get favClanIds() {
    return this.get('favClanIds');
  }

  get onlyShowFavs() {
    return this.get('onlyShowFavs');
  }

  get league() {
    return this.get('league');
  }

  get division() {
    return this.get('division');
  }

  get region() {
    return this.get('region');
  }

  get season() {
    return this.get('region');
  }
}
import { Inject, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Config } from 'src/config/config';
import { BaseInjection } from '../components/base.component';
import { LivefeedItem } from '../generated/models';
import { LivefeedForm } from '../interfaces/livefeed-config';
import { SignalrService, SignalrServiceToken } from '../interfaces/signalr.service';

@Injectable()
export class LivefeedService extends BaseInjection {

  private _items: LivefeedItem[] = [];
  private _form: LivefeedForm;

  get items() {
    return this._items;
  }

  get form() {
    return this._form;
  }

  showFilters = true;

  constructor(
    private config: Config,
    @Inject(SignalrServiceToken) private signalrService: SignalrService) {
    super();

    this._form = new LivefeedForm(this.config.livefeedConfig);
    this._form.valueChanges.pipe(switchMap(value => {
      this.config.livefeedConfig = value;
      return of(null);
    })).subscribe(() => this.config.save());
    this._form.liveUpdate.valueChanges.subscribe(value => this.signalrService.sendSettings({ liveUpdate: value }));

    this.signalrService.$livefeedUpdate.subscribe(items => this.addItems(items));
  }


  private addItems(items: LivefeedItem[]) {
    if (items.length < 0) {
      return;
    }
    const livefeedConfig = this.config.livefeedConfig;
    const clanwarsConfig = this.config.clanWarsConfig;

    if (clanwarsConfig.onlyShowFavs && clanwarsConfig.favClanIds) {
      items = items.filter(item => clanwarsConfig.favClanIds.includes(item.winnerClanId) || clanwarsConfig.favClanIds.includes(item.looserClanId));
    } else {
      if (clanwarsConfig.division.length > 0) {
        items = items.filter(item => clanwarsConfig.division.includes(item.winnerDivision) || clanwarsConfig.division.includes(item.looserDivision));
      }

      if (clanwarsConfig.league.length > 0) {
        items = items.filter(item => clanwarsConfig.league.includes(item.winnerLeague) || clanwarsConfig.league.includes(item.looserLeague));
      }

      if (clanwarsConfig.region.length > 0) {
        items = items.filter(item => clanwarsConfig.region.includes(item.winnerRegion) || clanwarsConfig.region.includes(item.looserRegion));
      }
    }

    if (livefeedConfig.notification) {
      let count = items.length;
      if (livefeedConfig.notificationFavsOnly) {
        count = items.filter(item => clanwarsConfig.favClanIds.includes(item.winnerClanId) || clanwarsConfig.favClanIds.includes(item.looserClanId)).length;
      }
      if (count > 0) {
        this.uiCustom({
          severity: 'c-success',
          summary: 'Clanwars',
          detail: `Feed updated`,
          closable: false,
          life: 1500
        });
      }
    }

    const newLength = this._items.length + items.length;
    if (newLength >= livefeedConfig.entries) {
      const toDelete = newLength - livefeedConfig.entries;
      this._items.splice(livefeedConfig.entries, toDelete);
    }

    this._items.unshift(...items);
  }
}

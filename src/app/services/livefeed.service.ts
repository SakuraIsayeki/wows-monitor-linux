import { Inject, Injectable } from '@angular/core';
import { SettingsService } from '@services/settings.service';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BaseInjection } from '@stewie/framework';
import { LivefeedItem } from '../generated/models';
import { SignalrService, SignalrServiceToken } from '@interfaces/signalr.service';

@Injectable()
export class LivefeedService extends BaseInjection {

  private _items: LivefeedItem[] = [];

  get items() {
    return this._items;
  }

  get form() {
    return this.settingsService.form.livefeedConfig;
  }

  showFilters = true;

  constructor(
    private settingsService: SettingsService,
    @Inject(SignalrServiceToken) private signalrService: SignalrService) {
    super();

    this.form.liveUpdate.valueChanges.subscribe(value => this.signalrService.sendSettings({ liveUpdate: value }));

    this.signalrService.$livefeedUpdate.subscribe(items => this.addItems(items));
  }


  private addItems(items: LivefeedItem[]) {
    if (items.length < 0) {
      return;
    }
    const livefeedConfig = this.settingsService.form.livefeedConfig.model;
    const clanwarsConfig = this.settingsService.form.clanWarsConfig.model;

    if (clanwarsConfig.onlyShowFavs && clanwarsConfig.favClanIds) {
      items = items.filter(item => clanwarsConfig.favClanIds.includes(item.winnerClanId) || clanwarsConfig.favClanIds.includes(item.looserClanId));
    } else {
      if (clanwarsConfig.divisions.length > 0) {
        items = items.filter(item => clanwarsConfig.divisions.includes(item.winnerDivision) || clanwarsConfig.divisions.includes(item.looserDivision));
      }

      if (clanwarsConfig.leagues.length > 0) {
        items = items.filter(item => clanwarsConfig.leagues.includes(item.winnerLeague) || clanwarsConfig.leagues.includes(item.looserLeague));
      }

      if (clanwarsConfig.regions.length > 0) {
        items = items.filter(item => clanwarsConfig.regions.includes(item.winnerRegion) || clanwarsConfig.regions.includes(item.looserRegion));
      }
    }

    if (livefeedConfig.notification) {
      let count = items.length;
      if (livefeedConfig.notificationFavsOnly) {
        count = items.filter(item => clanwarsConfig.favClanIds.includes(item.winnerClanId) || clanwarsConfig.favClanIds.includes(item.looserClanId)).length;
      }
      if (count > 0) {
        this.uiSuccess('cwFeedUpdated', 1500);
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

import { Inject, Injectable } from "@angular/core";
import { switchMap } from 'rxjs/operators';
import { Config } from 'src/config/config';
import { BaseInjection } from '../components/base.component';
import { LivefeedForm } from '../interfaces/livefeed-config';
import { LivefeedItem } from '../interfaces/livefeed-item';
import { SignalrService, SignalrServiceToken } from '../interfaces/signalr.service';

@Injectable()
export class LivefeedService extends BaseInjection {

  private _items: LivefeedItem[] = [];
  private _form: LivefeedForm;

  constructor(
    private config: Config,
    @Inject(SignalrServiceToken) private signalrService: SignalrService) {
    super();

    this._form = new LivefeedForm(this.config.livefeedConfig);
    this._form.valueChanges.pipe(switchMap(value => this.config.livefeedConfig = value)).subscribe();
    this._form.liveUpdate.valueChanges.subscribe(value => this.signalrService.sendSettings({ liveUpdate: value }));

    if (this.config.livefeedConfig.liveUpdate) {
      this.signalrService.sendSettings({ liveUpdate: true });
    }

    this.signalrService.$livefeedUpdate.subscribe(items => this.addItems(items))
  }


  private addItems(items: LivefeedItem[]) {
    let livefeedConfig = this.config.livefeedConfig;
    let clanwarsConfig = this.config.clanWarsConfig;

    if (clanwarsConfig.onlyShowFavs && clanwarsConfig.favClanIds) {
      items = items.filter(item => clanwarsConfig.favClanIds.includes(item.clanId));
    } else {
      if (clanwarsConfig.division) {
        items = items.filter(item => item.division == clanwarsConfig.division);
      }

      if (clanwarsConfig.league) {
        items = items.filter(item => item.league == clanwarsConfig.league);
      }

      if (clanwarsConfig.region) {
        items = items.filter(item => item.region == clanwarsConfig.region);
      }
    }

    if (livefeedConfig.notification) {
      var count = items.length;
      if (livefeedConfig.notificationFavsOnly) {
        count = items.filter(item => clanwarsConfig.favClanIds.includes(item.clanId)).length;
      }
      this.uiCustom({
        summary: 'Feed',
        detail: `New feed ${count}`
      })
    }

    var newLength = livefeedConfig.entries + items.length;
    if (newLength >= livefeedConfig.entries) {
      let toDelete = newLength - livefeedConfig.entries;
      this._items.splice(livefeedConfig.entries - 1, toDelete);
    }

    this._items.unshift(...items);
  }
}
import { Inject, Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Config } from 'src/config/config';
import { BaseInjection } from '../components/base.component';
import { LivefeedForm } from '../interfaces/livefeed-config';
import { LivefeedItem } from '../interfaces/livefeed-item';
import { SignalrService, SignalrServiceToken } from '../interfaces/signalr.service';
import { ClanWarsForm } from '../interfaces/clanwars-config';
import { of } from 'rxjs';

@Injectable()
export class ClanWarsService extends BaseInjection {

  private _form: ClanWarsForm;

  get form() {
    return this._form;
  }

  constructor(
    private config: Config) {
    super();

    this._form = new ClanWarsForm(this.config.clanWarsConfig);
    this._form.valueChanges.pipe(switchMap(value => {
      this.config.clanWarsConfig = value;
      return of(null);
    })).subscribe(() => this.config.save());
  }
}

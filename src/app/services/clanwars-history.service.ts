import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Config } from 'src/config/config';
import { BaseInjection } from '../components/base.component';
import { HistoryListRequestForm } from '../interfaces/history-list-request';
import { ApiService } from './api.service';

@Injectable()
export class ClanWarsHistoryService extends BaseInjection {

  private _form: HistoryListRequestForm;
  private _pagedResult: any;
  private _$load = new Subject();

  get form() {
    return this._form;
  }

  get items() {
    return this._pagedResult ? this._pagedResult.items : 0;
  }

  get pages() {
    return this._pagedResult ? this._pagedResult.totalPages : 0;
  }

  get totalCount() {
    return this._pagedResult ? this._pagedResult.totalCount : 0;
  }

  get first() {
    return this._pagedResult ? this._form.pageSize.value * (this._form.page.value - 1) : 0;
  }

  constructor(
    private config: Config,
    private apiService: ApiService) {
    super();

    this._form = new HistoryListRequestForm(this.config.clanWarsConfig);
    this._form.valueChanges.pipe(switchMap(value => {
      this.config.clanWarsConfig = value;
      return of(null);
    })).subscribe(() => this.config.save());

    this._form.valueChanges.subscribe(() => this.load());
    this._$load.pipe(
      debounceTime(300),
      switchMap(() => this.apiService.clansHistory(this._form.getRequestModel()))
    )
      .subscribe(result => this._pagedResult = result)
  }

  load() {
    this._$load.next();
  }

  onPage(event: any) {
    console.log(event);
    this._form.page.setValue(event.page + 1);
    this._form.pageSize.setValue(event.rows);
  }
}

import { Injectable } from '@angular/core';
import { AppConfigForm } from '@generated/forms/app-config.form';
import { AppConfig } from '@generated/models/app-config';
import { ConfigService } from '@generated/services/config.service';
import { BaseInjection } from '@stewie/framework';
import { interval, Observable, of } from 'rxjs';
import { debounceTime, map, skipWhile, take, tap } from 'rxjs/operators';

@Injectable()
export class SettingsService extends BaseInjection {

  private _form: AppConfigForm;
  get form() {
    return this._form;
  }

  private initialized = false;

  constructor(private configService: ConfigService) {
    super();
  }

  initialize(): Observable<boolean> {
    let config: AppConfig;
    try {
      const configItem = localStorage.getItem('config');
      if (!configItem) {
        throw new Error('No config found');
      }

      config = JSON.parse(configItem) as AppConfig;
      this.initForm(config);
      this.initialized = true;
      return of(true);
    } catch {
      return this.configService.configDefault().pipe(tap(config => {
        this.initForm(config);
        this.initialized = true;
      }), map(() => true));
    }
  }

  private initForm(config: AppConfig) {
    this._form = new AppConfigForm(config);

    this._form.monitorConfig.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      this.uiSuccess('settingsSaved');
    });

    this._form.valueChanges.pipe(debounceTime(300)).subscribe(() => this.save());
  }

  private save() {
    localStorage.setItem('config', JSON.stringify(this._form.model));
  }

  async waitForInitialized() {
    if (this.initialized) {
      return true;
    }
    await interval(300).pipe(
      skipWhile(() => !this.initialized),
      take(1)).toPromise();
    return true;
  }

  reset(){
    // TODO
    console.log('RESET CONFIG');

    return of().toPromise();
  }
}

import { Inject, Injectable } from '@angular/core';
import { AppConfigForm } from '@generated/forms/app-config.form';
import { AppConfig } from '@generated/models/app-config';
import { ConfigService } from '@generated/services/config.service';
import { TranslateService } from '@ngx-translate/core';
import { JwtAuthService } from '@services/jwt-auth.service';
import { AUTHSERVICETOKEN, BaseInjection, DynamicDialogService, StDatePipe } from '@stewie/framework';
import { interval, Observable, of, Subject } from 'rxjs';
import { debounceTime, skipWhile, switchMap, take } from 'rxjs/operators';

@Injectable()
export class SettingsService extends BaseInjection {

  private _form: AppConfigForm;
  get form() {
    return this._form;
  }

  private initialized = false;

  constructor(private configService: ConfigService,
              @Inject(AUTHSERVICETOKEN) private authService: JwtAuthService,
              private dynamicDialog: DynamicDialogService,
              private translate: TranslateService) {
    super();
  }

  async initialize(): Promise<boolean> {
    let localConfig: AppConfig;
    let remoteConfig: AppConfig;
    let useConfig: AppConfig;
    try {
      const configItem = localStorage.getItem('config');
      if (!configItem) {
        throw new Error('No config found');
      }

      localConfig = JSON.parse(configItem) as AppConfig;


      if (this.authService.userInfo.syncSettings && this.authService.isAuthenticated) {
        remoteConfig = await this.configService.configGet().toPromise();
      }
      if (remoteConfig?.lastSave != null && new Date(remoteConfig.lastSave).getTime() != new Date(localConfig.lastSave).getTime()) {
        // lastSave difference
        const dialogResult = await this.dynamicDialog.open({
          config: {
            header: this.translate.instant('settings.remoteConfig.header'),
            closable: false,
            modal: true
          },
          content: this.translate.instant('settings.remoteConfig.content'),
          buttons: [
            {
              id: 'local',
              icon: 'pi pi-desktop',
              label: await new StDatePipe(this.translate).transform(new Date(localConfig.lastSave), 'medium-s').pipe(take(1)).toPromise()
            },
            {
              id: 'remote',
              icon: 'pi pi-cloud',
              label: await new StDatePipe(this.translate).transform(new Date(remoteConfig.lastSave), 'medium-s').pipe(take(1)).toPromise()
            }
          ]
        }).toPromise();
        useConfig = dialogResult === 'local' ? localConfig : remoteConfig;
      } else {
        useConfig = localConfig;
      }

      this.initForm(useConfig);
      this.initialized = true;
      return true;
    } catch {
      const config = await this.configService.configDefault().toPromise();
      this.initForm(config);
      this.initialized = true;
      return true;
    }
  }

  private initForm(config: AppConfig) {
    this._form = new AppConfigForm(config);

    this._form.monitorConfig.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      this.uiSuccess('settingsSaved');
    });

    this._form.valueChanges.pipe(debounceTime(300),
      switchMap(() => this.save()))
      .subscribe();
  }

  public settingsSaved$ = new Subject();

  save(fromGateway: boolean = false): Observable<any> {

    if (!fromGateway) {
      this._form.lastSave.setValue(new Date().toJSON(), { emitEvent: false });
    }
    const config = this._form.model;
    localStorage.setItem('config', JSON.stringify(config));
    if (!fromGateway) {
      this.settingsSaved$.next();
    }
    if (!fromGateway && this.authService.isAuthenticated) {
      return this.configService.configSave({ body: config });
    }
    return of();
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

  reset() {
    // TODO
    console.log('RESET CONFIG');

    return of().toPromise();
  }
}

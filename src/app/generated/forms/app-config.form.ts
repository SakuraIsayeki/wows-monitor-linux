import { AppConfig, ClanWarsConfig, ConfigtoolConfig, LivefeedConfig, MonitorConfig } from '../models';
import { ClanWarsConfigForm } from './clan-wars-config.form';
import { ConfigtoolConfigForm } from './configtool-config.form';
import { LivefeedConfigForm } from './livefeed-config.form';
import { MonitorConfigForm } from './monitor-config.form';
import { AbstractControlOptions, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { DateFormControl, StFormControl, StFormGroup, ValidatorGetter } from '@stewie/framework';


export class AppConfigForm extends StFormGroup<AppConfig> {

  constructor(model: AppConfig | null | undefined, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
              asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null, validatorGetter?: ValidatorGetter) {
    super(model ?? {} as AppConfig, {}, validatorOrOpts, asyncValidator, validatorGetter);
  }
  
  protected addControls(model: AppConfig) {
    this.addControl('monitorConfig', new MonitorConfigForm(model?.monitorConfig, null, null, this.validatorGetter));
    this.addControl('analyticsInfoSeen', new StFormControl<boolean | null>(model?.analyticsInfoSeen, null, null));
    this.addControl('signalRToken', new StFormControl<string | null>(model?.signalRToken, null, null));
    this.addControl('selectedDirectory', new StFormControl<string | null>(model?.selectedDirectory, null, null));
    this.addControl('mainClient', new StFormControl<string | null>(model?.mainClient, null, null));
    this.addControl('seenChangelogs', new StFormControl<number[] | null>(model?.seenChangelogs ?? [], null, null));
    this.addControl('uuid', new StFormControl<string | null>(model?.uuid, null, null));
    this.addControl('configtoolConfig', new ConfigtoolConfigForm(model?.configtoolConfig, null, null, this.validatorGetter));
    this.addControl('livefeedConfig', new LivefeedConfigForm(model?.livefeedConfig, null, null, this.validatorGetter));
    this.addControl('clanWarsConfig', new ClanWarsConfigForm(model?.clanWarsConfig, null, null, this.validatorGetter));
    this.addControl('forcePVP', new StFormControl<boolean | null>(model?.forcePVP, null, null));
    this.addControl('lastSave', new DateFormControl(model?.lastSave, null, null));

    if(this.validatorGetter?.getCustomValidators){
      this.validatorGetter.getCustomValidators(this);
    }
    if(this.validatorGetter?.getCustomAsyncValidators){
      this.validatorGetter.getCustomAsyncValidators(this);
    }
  }

  reset(model?: AppConfig, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }) {
      this.monitorConfig?.reset(model ? model?.monitorConfig : null, options);    
      this.analyticsInfoSeen?.reset(model ? model?.analyticsInfoSeen : null, options);    
      this.signalRToken?.reset(model ? model?.signalRToken : null, options);    
      this.selectedDirectory?.reset(model ? model?.selectedDirectory : null, options);    
      this.mainClient?.reset(model ? model?.mainClient : null, options);    
      this.seenChangelogs?.reset(model ? model?.seenChangelogs ?? [] : null, options);    
      this.uuid?.reset(model ? model?.uuid : null, options);    
      this.configtoolConfig?.reset(model ? model?.configtoolConfig : null, options);    
      this.livefeedConfig?.reset(model ? model?.livefeedConfig : null, options);    
      this.clanWarsConfig?.reset(model ? model?.clanWarsConfig : null, options);    
      this.forcePVP?.reset(model ? model?.forcePVP : null, options);    
      this.lastSave?.reset(model ? model?.lastSave : null, options);    
    
  }
  
  setValue(model?: AppConfig, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
    emitModelToViewChange?: boolean;
    emitViewToModelChange?: boolean;
  }) {
    this.monitorConfig?.setValue(model?.monitorConfig, options);
    this.analyticsInfoSeen?.setValue(model?.analyticsInfoSeen, options);
    this.signalRToken?.setValue(model?.signalRToken, options);
    this.selectedDirectory?.setValue(model?.selectedDirectory, options);
    this.mainClient?.setValue(model?.mainClient, options);
    this.seenChangelogs?.setValue(model?.seenChangelogs ?? [], options);
    this.uuid?.setValue(model?.uuid, options);
    this.configtoolConfig?.setValue(model?.configtoolConfig, options);
    this.livefeedConfig?.setValue(model?.livefeedConfig, options);
    this.clanWarsConfig?.setValue(model?.clanWarsConfig, options);
    this.forcePVP?.setValue(model?.forcePVP, options);
    this.lastSave?.setValue(model?.lastSave, options);
    
  }


  get monitorConfig() {
    return this.controls.monitorConfig as MonitorConfigForm;
  }
  get analyticsInfoSeen() {
    return this.controls.analyticsInfoSeen as StFormControl<boolean | null>;
  }
  get signalRToken() {
    return this.controls.signalRToken as StFormControl<string | null>;
  }
  get selectedDirectory() {
    return this.controls.selectedDirectory as StFormControl<string | null>;
  }
  get mainClient() {
    return this.controls.mainClient as StFormControl<string | null>;
  }
  get seenChangelogs() {
    return this.controls.seenChangelogs as StFormControl<number[] | null>;
  }
  get uuid() {
    return this.controls.uuid as StFormControl<string | null>;
  }
  get configtoolConfig() {
    return this.controls.configtoolConfig as ConfigtoolConfigForm;
  }
  get livefeedConfig() {
    return this.controls.livefeedConfig as LivefeedConfigForm;
  }
  get clanWarsConfig() {
    return this.controls.clanWarsConfig as ClanWarsConfigForm;
  }
  get forcePVP() {
    return this.controls.forcePVP as StFormControl<boolean | null>;
  }
  get lastSave() {
    return this.controls.lastSave as DateFormControl;
  }


  get model(): AppConfig | null {
    if (this.returnNull) {
      return null;
    }

    const model = {
      monitorConfig: this.monitorConfig.model,
      analyticsInfoSeen: this.analyticsInfoSeen?.model,
      signalRToken: this.signalRToken?.model,
      selectedDirectory: this.selectedDirectory?.model,
      mainClient: this.mainClient?.model,
      seenChangelogs: this.seenChangelogs?.model,
      uuid: this.uuid?.model,
      configtoolConfig: this.configtoolConfig.model,
      livefeedConfig: this.livefeedConfig.model,
      clanWarsConfig: this.clanWarsConfig.model,
      forcePVP: this.forcePVP?.model,
      lastSave: this.lastSave?.model,
      
    } as AppConfig;
    
    return Object.assign(this.originalModel ?? {}, model);
  }
}

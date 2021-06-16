import { LivefeedConfig } from '../models';
import { AbstractControlOptions, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { StFormControl, StFormGroup, ValidatorGetter } from '@stewie/framework';


export class LivefeedConfigForm extends StFormGroup<LivefeedConfig> {

  constructor(model: LivefeedConfig | null | undefined, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
              asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null, validatorGetter?: ValidatorGetter) {
    super(model ?? {} as LivefeedConfig, {}, validatorOrOpts, asyncValidator, validatorGetter);
  }
  
  protected addControls(model: LivefeedConfig) {
    this.addControl('liveUpdate', new StFormControl<boolean | null>(model?.liveUpdate, null, null));
    this.addControl('notification', new StFormControl<boolean | null>(model?.notification, null, null));
    this.addControl('notificationFavsOnly', new StFormControl<boolean | null>(model?.notificationFavsOnly, null, null));
    this.addControl('entries', new StFormControl<number | null>(model?.entries, null, null));
    this.addControl('showFilters', new StFormControl<boolean | null>(model?.showFilters, null, null));

    if(this.validatorGetter?.getCustomValidators){
      this.validatorGetter.getCustomValidators(this);
    }
    if(this.validatorGetter?.getCustomAsyncValidators){
      this.validatorGetter.getCustomAsyncValidators(this);
    }
  }

  reset(model?: LivefeedConfig, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }) {
      this.liveUpdate?.reset(model ? model?.liveUpdate : null, options);    
      this.notification?.reset(model ? model?.notification : null, options);    
      this.notificationFavsOnly?.reset(model ? model?.notificationFavsOnly : null, options);    
      this.entries?.reset(model ? model?.entries : null, options);    
      this.showFilters?.reset(model ? model?.showFilters : null, options);    
    
  }
  
  setValue(model?: LivefeedConfig, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
    emitModelToViewChange?: boolean;
    emitViewToModelChange?: boolean;
  }) {
    this.liveUpdate?.setValue(model?.liveUpdate, options);
    this.notification?.setValue(model?.notification, options);
    this.notificationFavsOnly?.setValue(model?.notificationFavsOnly, options);
    this.entries?.setValue(model?.entries, options);
    this.showFilters?.setValue(model?.showFilters, options);
    
  }


  get liveUpdate() {
    return this.controls.liveUpdate as StFormControl<boolean | null>;
  }
  get notification() {
    return this.controls.notification as StFormControl<boolean | null>;
  }
  get notificationFavsOnly() {
    return this.controls.notificationFavsOnly as StFormControl<boolean | null>;
  }
  get entries() {
    return this.controls.entries as StFormControl<number | null>;
  }
  get showFilters() {
    return this.controls.showFilters as StFormControl<boolean | null>;
  }


  get model(): LivefeedConfig | null {
    if (this.returnNull) {
      return null;
    }

    const model = {
      liveUpdate: this.liveUpdate?.model,
      notification: this.notification?.model,
      notificationFavsOnly: this.notificationFavsOnly?.model,
      entries: this.entries?.model,
      showFilters: this.showFilters?.model,
      
    } as LivefeedConfig;
    
    return Object.assign(this.originalModel ?? {}, model);
  }
}

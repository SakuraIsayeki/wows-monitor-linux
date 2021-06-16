import { ConfigtoolConfig } from '../models';
import { AbstractControlOptions, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { StFormControl, StFormGroup, ValidatorGetter } from '@stewie/framework';


export class ConfigtoolConfigForm extends StFormGroup<ConfigtoolConfig> {

  constructor(model: ConfigtoolConfig | null | undefined, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
              asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null, validatorGetter?: ValidatorGetter) {
    super(model ?? {} as ConfigtoolConfig, {}, validatorOrOpts, asyncValidator, validatorGetter);
  }
  
  protected addControls(model: ConfigtoolConfig) {
    this.addControl('clientPaths', new StFormControl<string[] | null>(model?.clientPaths, null, null));
    this.addControl('maxFrameRate', new StFormControl<number | null>(model?.maxFrameRate, null, null));
    this.addControl('cacheEffectsEnabled', new StFormControl<boolean | null>(model?.cacheEffectsEnabled, null, null));
    this.addControl('cacheEffects', new StFormControl<boolean | null>(model?.cacheEffects, null, null));
    this.addControl('streamCacheSizeKBEnabled', new StFormControl<boolean | null>(model?.streamCacheSizeKBEnabled, null, null));
    this.addControl('streamCacheSizeKB', new StFormControl<number | null>(model?.streamCacheSizeKB, null, null));
    this.addControl('maxReplaysToSaveEnabled', new StFormControl<boolean | null>(model?.maxReplaysToSaveEnabled, null, null));
    this.addControl('maxReplaysToSave', new StFormControl<number | null>(model?.maxReplaysToSave, null, null));
    this.addControl('versionedReplaysEnabled', new StFormControl<boolean | null>(model?.versionedReplaysEnabled, null, null));
    this.addControl('versionedReplays', new StFormControl<boolean | null>(model?.versionedReplays, null, null));

    if(this.validatorGetter?.getCustomValidators){
      this.validatorGetter.getCustomValidators(this);
    }
    if(this.validatorGetter?.getCustomAsyncValidators){
      this.validatorGetter.getCustomAsyncValidators(this);
    }
  }

  reset(model?: ConfigtoolConfig, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }) {
      this.clientPaths?.reset(model ? model?.clientPaths : null, options);    
      this.maxFrameRate?.reset(model ? model?.maxFrameRate : null, options);    
      this.cacheEffectsEnabled?.reset(model ? model?.cacheEffectsEnabled : null, options);    
      this.cacheEffects?.reset(model ? model?.cacheEffects : null, options);    
      this.streamCacheSizeKBEnabled?.reset(model ? model?.streamCacheSizeKBEnabled : null, options);    
      this.streamCacheSizeKB?.reset(model ? model?.streamCacheSizeKB : null, options);    
      this.maxReplaysToSaveEnabled?.reset(model ? model?.maxReplaysToSaveEnabled : null, options);    
      this.maxReplaysToSave?.reset(model ? model?.maxReplaysToSave : null, options);    
      this.versionedReplaysEnabled?.reset(model ? model?.versionedReplaysEnabled : null, options);    
      this.versionedReplays?.reset(model ? model?.versionedReplays : null, options);    
    
  }
  
  setValue(model?: ConfigtoolConfig, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
    emitModelToViewChange?: boolean;
    emitViewToModelChange?: boolean;
  }) {
    this.clientPaths?.setValue(model?.clientPaths, options);
    this.maxFrameRate?.setValue(model?.maxFrameRate, options);
    this.cacheEffectsEnabled?.setValue(model?.cacheEffectsEnabled, options);
    this.cacheEffects?.setValue(model?.cacheEffects, options);
    this.streamCacheSizeKBEnabled?.setValue(model?.streamCacheSizeKBEnabled, options);
    this.streamCacheSizeKB?.setValue(model?.streamCacheSizeKB, options);
    this.maxReplaysToSaveEnabled?.setValue(model?.maxReplaysToSaveEnabled, options);
    this.maxReplaysToSave?.setValue(model?.maxReplaysToSave, options);
    this.versionedReplaysEnabled?.setValue(model?.versionedReplaysEnabled, options);
    this.versionedReplays?.setValue(model?.versionedReplays, options);
    
  }


  get clientPaths() {
    return this.controls.clientPaths as StFormControl<string[] | null>;
  }
  get maxFrameRate() {
    return this.controls.maxFrameRate as StFormControl<number | null>;
  }
  get cacheEffectsEnabled() {
    return this.controls.cacheEffectsEnabled as StFormControl<boolean | null>;
  }
  get cacheEffects() {
    return this.controls.cacheEffects as StFormControl<boolean | null>;
  }
  get streamCacheSizeKBEnabled() {
    return this.controls.streamCacheSizeKBEnabled as StFormControl<boolean | null>;
  }
  get streamCacheSizeKB() {
    return this.controls.streamCacheSizeKB as StFormControl<number | null>;
  }
  get maxReplaysToSaveEnabled() {
    return this.controls.maxReplaysToSaveEnabled as StFormControl<boolean | null>;
  }
  get maxReplaysToSave() {
    return this.controls.maxReplaysToSave as StFormControl<number | null>;
  }
  get versionedReplaysEnabled() {
    return this.controls.versionedReplaysEnabled as StFormControl<boolean | null>;
  }
  get versionedReplays() {
    return this.controls.versionedReplays as StFormControl<boolean | null>;
  }


  get model(): ConfigtoolConfig | null {
    if (this.returnNull) {
      return null;
    }

    const model = {
      clientPaths: this.clientPaths?.model,
      maxFrameRate: this.maxFrameRate?.model,
      cacheEffectsEnabled: this.cacheEffectsEnabled?.model,
      cacheEffects: this.cacheEffects?.model,
      streamCacheSizeKBEnabled: this.streamCacheSizeKBEnabled?.model,
      streamCacheSizeKB: this.streamCacheSizeKB?.model,
      maxReplaysToSaveEnabled: this.maxReplaysToSaveEnabled?.model,
      maxReplaysToSave: this.maxReplaysToSave?.model,
      versionedReplaysEnabled: this.versionedReplaysEnabled?.model,
      versionedReplays: this.versionedReplays?.model,
      
    } as ConfigtoolConfig;
    
    return Object.assign(this.originalModel ?? {}, model);
  }
}

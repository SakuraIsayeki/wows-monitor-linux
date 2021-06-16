import { ClanLeague, ClanWarsConfig, Region } from '../models';
import { AbstractControlOptions, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { StFormControl, StFormGroup, ValidatorGetter } from '@stewie/framework';


export class ClanWarsConfigForm extends StFormGroup<ClanWarsConfig> {

  constructor(model: ClanWarsConfig | null | undefined, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
              asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null, validatorGetter?: ValidatorGetter) {
    super(model ?? {} as ClanWarsConfig, {}, validatorOrOpts, asyncValidator, validatorGetter);
  }
  
  protected addControls(model: ClanWarsConfig) {
    this.addControl('favClanIds', new StFormControl<number[] | null>(model?.favClanIds, null, null));
    this.addControl('onlyShowFavs', new StFormControl<boolean | null>(model?.onlyShowFavs, null, null));
    this.addControl('leagues', new StFormControl<ClanLeague[] | null>(model?.leagues, null, null));
    this.addControl('divisions', new StFormControl<number[] | null>(model?.divisions, null, null));
    this.addControl('regions', new StFormControl<Region[] | null>(model?.regions, null, null));
    this.addControl('season', new StFormControl<number | null>(model?.season, null, null));

    if(this.validatorGetter?.getCustomValidators){
      this.validatorGetter.getCustomValidators(this);
    }
    if(this.validatorGetter?.getCustomAsyncValidators){
      this.validatorGetter.getCustomAsyncValidators(this);
    }
  }

  reset(model?: ClanWarsConfig, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }) {
      this.favClanIds?.reset(model ? model?.favClanIds : null, options);    
      this.onlyShowFavs?.reset(model ? model?.onlyShowFavs : null, options);    
      this.leagues?.reset(model ? model?.leagues : null, options);    
      this.divisions?.reset(model ? model?.divisions : null, options);    
      this.regions?.reset(model ? model?.regions : null, options);    
      this.season?.reset(model ? model?.season : null, options);    
    
  }
  
  setValue(model?: ClanWarsConfig, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
    emitModelToViewChange?: boolean;
    emitViewToModelChange?: boolean;
  }) {
    this.favClanIds?.setValue(model?.favClanIds, options);
    this.onlyShowFavs?.setValue(model?.onlyShowFavs, options);
    this.leagues?.setValue(model?.leagues, options);
    this.divisions?.setValue(model?.divisions, options);
    this.regions?.setValue(model?.regions, options);
    this.season?.setValue(model?.season, options);
    
  }


  get favClanIds() {
    return this.controls.favClanIds as StFormControl<number[] | null>;
  }
  get onlyShowFavs() {
    return this.controls.onlyShowFavs as StFormControl<boolean | null>;
  }
  get leagues() {
    return this.controls.leagues as StFormControl<ClanLeague[] | null>;
  }
  get divisions() {
    return this.controls.divisions as StFormControl<number[] | null>;
  }
  get regions() {
    return this.controls.regions as StFormControl<Region[] | null>;
  }
  get season() {
    return this.controls.season as StFormControl<number | null>;
  }


  get model(): ClanWarsConfig | null {
    if (this.returnNull) {
      return null;
    }

    const model = {
      favClanIds: this.favClanIds?.model,
      onlyShowFavs: this.onlyShowFavs?.model,
      leagues: this.leagues?.model,
      divisions: this.divisions?.model,
      regions: this.regions?.model,
      season: this.season?.model,
      
    } as ClanWarsConfig;
    
    return Object.assign(this.originalModel ?? {}, model);
  }
}

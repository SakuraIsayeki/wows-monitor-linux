import { ClanLeague, HistoryListRequest, Region, SortOrder } from '../models';
import { AbstractControlOptions, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { StFormControl, StFormGroup, ValidatorGetter } from '@stewie/framework';


export class HistoryListRequestForm extends StFormGroup<HistoryListRequest> {

  constructor(model: HistoryListRequest | null | undefined, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
              asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null, validatorGetter?: ValidatorGetter) {
    super(model ?? {} as HistoryListRequest, {}, validatorOrOpts, asyncValidator, validatorGetter);
  }
  
  protected addControls(model: HistoryListRequest) {
    this.addControl('clanId', new StFormControl<number | null>(model?.clanId, null, null));
    this.addControl('team', new StFormControl<number | null>(model?.team, null, null));
    this.addControl('clanIds', new StFormControl<number[] | null>(model?.clanIds, null, null));
    this.addControl('filterClanIds', new StFormControl<boolean | null>(model?.filterClanIds, null, null));
    this.addControl('regions', new StFormControl<Region[] | null>(model?.regions, null, null));
    this.addControl('leagues', new StFormControl<ClanLeague[] | null>(model?.leagues, null, null));
    this.addControl('divisions', new StFormControl<number[] | null>(model?.divisions, null, null));
    this.addControl('season', new StFormControl<number | null>(model?.season, null, null));
    this.addControl('page', new StFormControl<number | null>(model?.page ?? 1, null, null));
    this.addControl('pageSize', new StFormControl<number | null>(model?.pageSize ?? 10, null, null));
    this.addControl('sortColumn', new StFormControl<string | null>(model?.sortColumn, null, null));
    this.addControl('sortDirection', new StFormControl<SortOrder | null>(model?.sortDirection ?? -1, null, null));

    if(this.validatorGetter?.getCustomValidators){
      this.validatorGetter.getCustomValidators(this);
    }
    if(this.validatorGetter?.getCustomAsyncValidators){
      this.validatorGetter.getCustomAsyncValidators(this);
    }
  }

  reset(model?: HistoryListRequest, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }) {
      this.clanId?.reset(model ? model?.clanId : null, options);    
      this.team?.reset(model ? model?.team : null, options);    
      this.clanIds?.reset(model ? model?.clanIds : null, options);    
      this.filterClanIds?.reset(model ? model?.filterClanIds : null, options);    
      this.regions?.reset(model ? model?.regions : null, options);    
      this.leagues?.reset(model ? model?.leagues : null, options);    
      this.divisions?.reset(model ? model?.divisions : null, options);    
      this.season?.reset(model ? model?.season : null, options);    
      this.page?.reset(model ? model?.page ?? 1 : null, options);    
      this.pageSize?.reset(model ? model?.pageSize ?? 10 : null, options);    
      this.sortColumn?.reset(model ? model?.sortColumn : null, options);    
      this.sortDirection?.reset(model ? model?.sortDirection ?? -1 : null, options);    
    
  }
  
  setValue(model?: HistoryListRequest, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
    emitModelToViewChange?: boolean;
    emitViewToModelChange?: boolean;
  }) {
    this.clanId?.setValue(model?.clanId, options);
    this.team?.setValue(model?.team, options);
    this.clanIds?.setValue(model?.clanIds, options);
    this.filterClanIds?.setValue(model?.filterClanIds, options);
    this.regions?.setValue(model?.regions, options);
    this.leagues?.setValue(model?.leagues, options);
    this.divisions?.setValue(model?.divisions, options);
    this.season?.setValue(model?.season, options);
    this.page?.setValue(model?.page ?? 1, options);
    this.pageSize?.setValue(model?.pageSize ?? 10, options);
    this.sortColumn?.setValue(model?.sortColumn, options);
    this.sortDirection?.setValue(model?.sortDirection ?? -1, options);
    
  }


  get clanId() {
    return this.controls.clanId as StFormControl<number | null>;
  }
  get team() {
    return this.controls.team as StFormControl<number | null>;
  }
  get clanIds() {
    return this.controls.clanIds as StFormControl<number[] | null>;
  }
  get filterClanIds() {
    return this.controls.filterClanIds as StFormControl<boolean | null>;
  }
  get regions() {
    return this.controls.regions as StFormControl<Region[] | null>;
  }
  get leagues() {
    return this.controls.leagues as StFormControl<ClanLeague[] | null>;
  }
  get divisions() {
    return this.controls.divisions as StFormControl<number[] | null>;
  }
  get season() {
    return this.controls.season as StFormControl<number | null>;
  }
  get page() {
    return this.controls.page as StFormControl<number | null>;
  }
  get pageSize() {
    return this.controls.pageSize as StFormControl<number | null>;
  }
  get sortColumn() {
    return this.controls.sortColumn as StFormControl<string | null>;
  }
  get sortDirection() {
    return this.controls.sortDirection as StFormControl<SortOrder | null>;
  }


  get model(): HistoryListRequest | null {
    if (this.returnNull) {
      return null;
    }

    const model = {
      clanId: this.clanId?.model,
      team: this.team?.model,
      clanIds: this.clanIds?.model,
      filterClanIds: this.filterClanIds?.model,
      regions: this.regions?.model,
      leagues: this.leagues?.model,
      divisions: this.divisions?.model,
      season: this.season?.model,
      page: this.page?.model,
      pageSize: this.pageSize?.model,
      sortColumn: this.sortColumn?.model,
      sortDirection: this.sortDirection?.model,
      
    } as HistoryListRequest;
    
    return Object.assign(this.originalModel ?? {}, model);
  }
}

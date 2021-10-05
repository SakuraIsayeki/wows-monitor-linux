import { MatchGroup, MatchListRequest, Region, SortOrder } from '../models';
import { AbstractControlOptions, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { DateFormControl, StFormControl, StFormGroup, ValidatorGetter } from '@stewie/framework';


export class MatchListRequestForm extends StFormGroup<MatchListRequest> {

  constructor(model: MatchListRequest | null | undefined, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
              asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null, validatorGetter?: ValidatorGetter) {
    super(model ?? {} as MatchListRequest, {}, validatorOrOpts, asyncValidator, validatorGetter);
  }
  
  protected addControls(model: MatchListRequest) {
    this.addControl('start', new DateFormControl(model?.start, null, null));
    this.addControl('end', new DateFormControl(model?.end, null, null));
    this.addControl('mapIds', new StFormControl<number[] | null>(model?.mapIds, null, null));
    this.addControl('matchGroups', new StFormControl<MatchGroup[] | null>(model?.matchGroups, null, null));
    this.addControl('shipIds', new StFormControl<number[] | null>(model?.shipIds, null, null));
    this.addControl('region', new StFormControl<Region | null>(model?.region, null, null));
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

  reset(model?: MatchListRequest, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }) {
      this.start?.reset(model ? model?.start : null, options);    
      this.end?.reset(model ? model?.end : null, options);    
      this.mapIds?.reset(model ? model?.mapIds : null, options);    
      this.matchGroups?.reset(model ? model?.matchGroups : null, options);    
      this.shipIds?.reset(model ? model?.shipIds : null, options);    
      this.region?.reset(model ? model?.region : null, options);    
      this.page?.reset(model ? model?.page ?? 1 : null, options);    
      this.pageSize?.reset(model ? model?.pageSize ?? 10 : null, options);    
      this.sortColumn?.reset(model ? model?.sortColumn : null, options);    
      this.sortDirection?.reset(model ? model?.sortDirection ?? -1 : null, options);    
    
  }
  
  setValue(model?: MatchListRequest, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
    emitModelToViewChange?: boolean;
    emitViewToModelChange?: boolean;
  }) {
    this.start?.setValue(model?.start, options);
    this.end?.setValue(model?.end, options);
    this.mapIds?.setValue(model?.mapIds, options);
    this.matchGroups?.setValue(model?.matchGroups, options);
    this.shipIds?.setValue(model?.shipIds, options);
    this.region?.setValue(model?.region, options);
    this.page?.setValue(model?.page ?? 1, options);
    this.pageSize?.setValue(model?.pageSize ?? 10, options);
    this.sortColumn?.setValue(model?.sortColumn, options);
    this.sortDirection?.setValue(model?.sortDirection ?? -1, options);
    
  }


  get start() {
    return this.controls.start as DateFormControl;
  }
  get end() {
    return this.controls.end as DateFormControl;
  }
  get mapIds() {
    return this.controls.mapIds as StFormControl<number[] | null>;
  }
  get matchGroups() {
    return this.controls.matchGroups as StFormControl<MatchGroup[] | null>;
  }
  get shipIds() {
    return this.controls.shipIds as StFormControl<number[] | null>;
  }
  get region() {
    return this.controls.region as StFormControl<Region | null>;
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


  get model(): MatchListRequest | null {
    if (this.returnNull) {
      return null;
    }

    const model = {
      start: this.start?.model,
      end: this.end?.model,
      mapIds: this.mapIds?.model,
      matchGroups: this.matchGroups?.model,
      shipIds: this.shipIds?.model,
      region: this.region?.model,
      page: this.page?.model,
      pageSize: this.pageSize?.model,
      sortColumn: this.sortColumn?.model,
      sortDirection: this.sortDirection?.model,
      
    } as MatchListRequest;
    
    return Object.assign(this.originalModel ?? {}, model);
  }
}

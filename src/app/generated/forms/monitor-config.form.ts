import { FontSize, LayoutMode, MonitorConfig, PlayerBackgrounds, PlayerBackgroundsMode, TeamWinrate } from '../models';
import { AbstractControlOptions, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { StFormControl, StFormGroup, ValidatorGetter } from '@stewie/framework';


export class MonitorConfigForm extends StFormGroup<MonitorConfig> {

  constructor(model: MonitorConfig | null | undefined, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
              asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null, validatorGetter?: ValidatorGetter) {
    super(model ?? {} as MonitorConfig, {}, validatorOrOpts, asyncValidator, validatorGetter);
  }
  
  protected addControls(model: MonitorConfig) {
    this.addControl('autoUpdate', new StFormControl<boolean | null>(model?.autoUpdate, null, null));
    this.addControl('anonymIp', new StFormControl<boolean | null>(model?.anonymIp, null, null));
    this.addControl('enableAnalytics', new StFormControl<boolean | null>(model?.enableAnalytics, null, null));
    this.addControl('allowBeta', new StFormControl<boolean | null>(model?.allowBeta, null, null));
    this.addControl('layoutMode', new StFormControl<LayoutMode | null>(model?.layoutMode, null, null));
    this.addControl('playerBackgrounds', new StFormControl<PlayerBackgrounds | null>(model?.playerBackgrounds, null, null));
    this.addControl('playerBackgroundsMode', new StFormControl<PlayerBackgroundsMode | null>(model?.playerBackgroundsMode, null, null));
    this.addControl('highContrastMode', new StFormControl<boolean | null>(model?.highContrastMode, null, null));
    this.addControl('fontSize', new StFormControl<FontSize | null>(model?.fontSize, null, null));
    this.addControl('coloredValues', new StFormControl<boolean | null>(model?.coloredValues, null, null));
    this.addControl('teamWinrate', new StFormControl<TeamWinrate | null>(model?.teamWinrate, null, null));
    this.addControl('overwriteReplaysDirectory', new StFormControl<string | null>(model?.overwriteReplaysDirectory, null, null));
    this.addControl('closeToTray', new StFormControl<boolean | null>(model?.closeToTray, null, null));
    this.addControl('anonymScreenshot', new StFormControl<boolean | null>(model?.anonymScreenshot, null, null));
    this.addControl('screenshotPath', new StFormControl<string | null>(model?.screenshotPath, null, null));

    if(this.validatorGetter?.getCustomValidators){
      this.validatorGetter.getCustomValidators(this);
    }
    if(this.validatorGetter?.getCustomAsyncValidators){
      this.validatorGetter.getCustomAsyncValidators(this);
    }
  }

  reset(model?: MonitorConfig, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }) {
      this.autoUpdate?.reset(model ? model?.autoUpdate : null, options);    
      this.anonymIp?.reset(model ? model?.anonymIp : null, options);    
      this.enableAnalytics?.reset(model ? model?.enableAnalytics : null, options);    
      this.allowBeta?.reset(model ? model?.allowBeta : null, options);    
      this.layoutMode?.reset(model ? model?.layoutMode : null, options);    
      this.playerBackgrounds?.reset(model ? model?.playerBackgrounds : null, options);    
      this.playerBackgroundsMode?.reset(model ? model?.playerBackgroundsMode : null, options);    
      this.highContrastMode?.reset(model ? model?.highContrastMode : null, options);    
      this.fontSize?.reset(model ? model?.fontSize : null, options);    
      this.coloredValues?.reset(model ? model?.coloredValues : null, options);    
      this.teamWinrate?.reset(model ? model?.teamWinrate : null, options);    
      this.overwriteReplaysDirectory?.reset(model ? model?.overwriteReplaysDirectory : null, options);    
      this.closeToTray?.reset(model ? model?.closeToTray : null, options);    
      this.anonymScreenshot?.reset(model ? model?.anonymScreenshot : null, options);    
      this.screenshotPath?.reset(model ? model?.screenshotPath : null, options);    
    
  }
  
  setValue(model?: MonitorConfig, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
    emitModelToViewChange?: boolean;
    emitViewToModelChange?: boolean;
  }) {
    this.autoUpdate?.setValue(model?.autoUpdate, options);
    this.anonymIp?.setValue(model?.anonymIp, options);
    this.enableAnalytics?.setValue(model?.enableAnalytics, options);
    this.allowBeta?.setValue(model?.allowBeta, options);
    this.layoutMode?.setValue(model?.layoutMode, options);
    this.playerBackgrounds?.setValue(model?.playerBackgrounds, options);
    this.playerBackgroundsMode?.setValue(model?.playerBackgroundsMode, options);
    this.highContrastMode?.setValue(model?.highContrastMode, options);
    this.fontSize?.setValue(model?.fontSize, options);
    this.coloredValues?.setValue(model?.coloredValues, options);
    this.teamWinrate?.setValue(model?.teamWinrate, options);
    this.overwriteReplaysDirectory?.setValue(model?.overwriteReplaysDirectory, options);
    this.closeToTray?.setValue(model?.closeToTray, options);
    this.anonymScreenshot?.setValue(model?.anonymScreenshot, options);
    this.screenshotPath?.setValue(model?.screenshotPath, options);
    
  }


  get autoUpdate() {
    return this.controls.autoUpdate as StFormControl<boolean | null>;
  }
  get anonymIp() {
    return this.controls.anonymIp as StFormControl<boolean | null>;
  }
  get enableAnalytics() {
    return this.controls.enableAnalytics as StFormControl<boolean | null>;
  }
  get allowBeta() {
    return this.controls.allowBeta as StFormControl<boolean | null>;
  }
  get layoutMode() {
    return this.controls.layoutMode as StFormControl<LayoutMode | null>;
  }
  get playerBackgrounds() {
    return this.controls.playerBackgrounds as StFormControl<PlayerBackgrounds | null>;
  }
  get playerBackgroundsMode() {
    return this.controls.playerBackgroundsMode as StFormControl<PlayerBackgroundsMode | null>;
  }
  get highContrastMode() {
    return this.controls.highContrastMode as StFormControl<boolean | null>;
  }
  get fontSize() {
    return this.controls.fontSize as StFormControl<FontSize | null>;
  }
  get coloredValues() {
    return this.controls.coloredValues as StFormControl<boolean | null>;
  }
  get teamWinrate() {
    return this.controls.teamWinrate as StFormControl<TeamWinrate | null>;
  }
  get overwriteReplaysDirectory() {
    return this.controls.overwriteReplaysDirectory as StFormControl<string | null>;
  }
  get closeToTray() {
    return this.controls.closeToTray as StFormControl<boolean | null>;
  }
  get anonymScreenshot() {
    return this.controls.anonymScreenshot as StFormControl<boolean | null>;
  }
  get screenshotPath() {
    return this.controls.screenshotPath as StFormControl<string | null>;
  }


  get model(): MonitorConfig | null {
    if (this.returnNull) {
      return null;
    }

    const model = {
      autoUpdate: this.autoUpdate?.model,
      anonymIp: this.anonymIp?.model,
      enableAnalytics: this.enableAnalytics?.model,
      allowBeta: this.allowBeta?.model,
      layoutMode: this.layoutMode?.model,
      playerBackgrounds: this.playerBackgrounds?.model,
      playerBackgroundsMode: this.playerBackgroundsMode?.model,
      highContrastMode: this.highContrastMode?.model,
      fontSize: this.fontSize?.model,
      coloredValues: this.coloredValues?.model,
      teamWinrate: this.teamWinrate?.model,
      overwriteReplaysDirectory: this.overwriteReplaysDirectory?.model,
      closeToTray: this.closeToTray?.model,
      anonymScreenshot: this.anonymScreenshot?.model,
      screenshotPath: this.screenshotPath?.model,
      
    } as MonitorConfig;
    
    return Object.assign(this.originalModel ?? {}, model);
  }
}

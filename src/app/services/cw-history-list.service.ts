import { Injectable } from '@angular/core';
import { HistoryListRequestForm } from '@generated/forms/history-list-request.form';
import { CwMatchAppModel } from '@generated/models';
import { ClansService } from '@generated/services';
import { SettingsService } from '@services/settings.service';
import { BaseListService } from '@stewie/framework';
import { startWith } from 'rxjs/operators';

@Injectable()
export class CwHistoryListService extends BaseListService<CwMatchAppModel, HistoryListRequestForm> {

  constructor(private settingsService: SettingsService,
              private clansService: ClansService) {
    super(request => clansService.clansHistory({ body: request }), () => {
      const form = new HistoryListRequestForm({
        pageSize: 25,
        regions: settingsService.form.clanWarsConfig.regions.model,
        divisions: settingsService.form.clanWarsConfig.divisions.model,
        leagues: settingsService.form.clanWarsConfig.leagues.model,
        season: settingsService.form.clanWarsConfig.season.model,
        clanIds: settingsService.form.clanWarsConfig.favClanIds.model,
        filterClanIds: settingsService.form.clanWarsConfig.onlyShowFavs.model
      });

      form.regions.valueChanges.subscribe(v => settingsService.form.clanWarsConfig.regions.setValue(v));
      form.divisions.valueChanges.subscribe(v => settingsService.form.clanWarsConfig.divisions.setValue(v));
      form.leagues.valueChanges.subscribe(v => settingsService.form.clanWarsConfig.leagues.setValue(v));
      form.season.valueChanges.subscribe(v => settingsService.form.clanWarsConfig.season.setValue(v));
      form.clanIds.valueChanges.subscribe(v => settingsService.form.clanWarsConfig.favClanIds.setValue(v));
      form.filterClanIds.valueChanges.pipe(startWith(form.filterClanIds.value)).subscribe(v => {
        if(v){
          form.clanIds.enable({emitEvent: false});
        } else{
          form.clanIds.disable({emitEvent: false, returnNull: true});
        }
        settingsService.form.clanWarsConfig.onlyShowFavs.setValue(v)
      });

      return form;
    }, true);
  }
}

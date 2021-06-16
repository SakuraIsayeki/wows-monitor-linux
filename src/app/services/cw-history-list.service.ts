import { Injectable } from '@angular/core';
import { HistoryListRequestForm } from '@generated/forms';
import { CwClanMatch } from '@generated/models/cw-clan-match';
import { ClansService } from '@generated/services';
import { SettingsService } from '@services/settings.service';
import { BaseListService } from '@stewie/framework';

@Injectable()
export class CwHistoryListService extends BaseListService<CwClanMatch, HistoryListRequestForm> {

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
      form.filterClanIds.valueChanges.subscribe(v => settingsService.form.clanWarsConfig.onlyShowFavs.setValue(v));

      return form;
    });
  }
}

import { Injectable } from '@angular/core';
import { MatchListRequestForm } from '@generated/forms/match-list-request.form';
import { MatchListAppModel } from '@generated/models';
import { MatchHistoryService } from '@generated/services';
import { SettingsService } from '@services/settings.service';
import { BaseListService } from '@stewie/framework';

@Injectable()
export class MatchHistoryListService extends BaseListService<MatchListAppModel, MatchListRequestForm> {

  constructor(private settingsService: SettingsService,
              private matchHistoryService: MatchHistoryService) {
    super(request => matchHistoryService.matchHistoryList({ body: request }), () => {
      const form = new MatchListRequestForm(null);
      form.start.setValue(null);
      form.end.setValue(null);
      return form;
    }, true);
  }
}

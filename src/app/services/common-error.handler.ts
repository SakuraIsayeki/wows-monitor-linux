import { Injectable } from '@angular/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { AnalyticsService, AnalyticsServiceToken } from '@interfaces/analytics.service';
import { LoggerService, LoggerServiceToken } from '@interfaces/logger.service';
import { GlobalErrorHandler, LocatorService } from '@stewie/framework';

marker('uimessages.apiError.wrongRegion.detail');
marker('uimessages.apiError.wrongRegion.summary');
marker('uimessages.apiError.contentEmpty.detail');
marker('uimessages.apiError.contentEmpty.summary');

@Injectable()
export class CommonErrorHandler extends GlobalErrorHandler {

  handleError(error) {
    super.handleError(error);
    (LocatorService.Injector.get(AnalyticsServiceToken) as AnalyticsService).exception(error);
    (LocatorService.Injector.get(LoggerServiceToken) as LoggerService).error(error);
  }
}

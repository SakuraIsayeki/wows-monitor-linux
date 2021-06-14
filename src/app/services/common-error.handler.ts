import { AnalyticsService, AnalyticsServiceToken } from '@interfaces/analytics.service';
import { LoggerService, LoggerServiceToken } from '@interfaces/logger.service';
import { GlobalErrorHandler, LocatorService } from '@stewie/framework';

export class CommonErrorHandler extends GlobalErrorHandler {

  handleError(error) {
    super.handleError(error);
    (LocatorService.Injector.get(AnalyticsServiceToken) as AnalyticsService).exception(error);
    (LocatorService.Injector.get(LoggerServiceToken) as LoggerService).error(error);
  }
}

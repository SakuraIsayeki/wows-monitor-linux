import { ErrorHandler } from '@angular/core';
import { LocatorService } from './locator.service';
import { LoggerServiceToken, LoggerService } from '../interfaces/logger.service';
import { AnalyticsServiceToken, AnalyticsService } from '../interfaces/analytics.service';

export class CommonErrorHandler implements ErrorHandler {

  handleError(error) {
    (LocatorService.Injector.get(AnalyticsServiceToken) as AnalyticsService).exception(error);
    (LocatorService.Injector.get(LoggerServiceToken) as LoggerService).error(error);
  }
}

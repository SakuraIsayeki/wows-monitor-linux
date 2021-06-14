import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AnalyticsService, AnalyticsServiceToken } from '@interfaces/analytics.service';
import { LoggerService, LoggerServiceToken } from '@interfaces/logger.service';
import { LocatorService } from './locator.service';

export class CommonErrorHandler implements ErrorHandler {

  handleError(error) {
    if (error instanceof HttpErrorResponse && error.status !== 200) {
      (LocatorService.Injector.get(MessageService) as MessageService).add({
        closable: false,
        life: 3000,
        severity: 'c-error',
        summary: 'uiMessages.summaries.error',
        detail: `uiMessages.messages.http${error.status}`
      });
    }

    (LocatorService.Injector.get(AnalyticsServiceToken) as AnalyticsService).exception(error);
    (LocatorService.Injector.get(LoggerServiceToken) as LoggerService).error(error);
  }
}

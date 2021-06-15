import { LoggerService } from '@interfaces/logger.service';
import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';


export class CustomMissingTranslationHandler extends MissingTranslationHandler {

  constructor(private loggerService: LoggerService) {
    super();
  }

  handle(params: MissingTranslationHandlerParams) {
    this.loggerService.warn(`Missing translation for key "${params.key}"`);
    return params.key;
  }
}

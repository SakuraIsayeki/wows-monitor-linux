import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, Injector, NgModule, Inject, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MetaLoader, MetaModule, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core';
import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { appConfig } from 'src/config/app.config';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultComponent } from './components/default/default.component';
import { ApiService } from './services/api.service';
import { CommonErrorHandler } from './services/common-error.handler';
import { LocatorService } from './services/locator.service';
import { ResizeService } from './services/resize.service';
import { LoggerService, LoggerServiceToken } from './interfaces/logger.service';
import { CustomMissingTranslationHandler } from './services/custom-missing-translation.handler';

const translateHttpLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

const missingTranslationHandler = (loggerServiceDepHolder: LoggerServiceDepHolder) => {
  return new CustomMissingTranslationHandler(loggerServiceDepHolder.loggerService);
};

@Injectable()
export class LoggerServiceDepHolder {
  constructor(@Inject(LoggerServiceToken) public loggerService: LoggerService) {
  }
}

const metaFactory = (translate: TranslateService) => {
  return new MetaStaticLoader({
    callback: (key: string) => translate.get(key),
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    pageTitleSeparator: ' - ',
    applicationName: appConfig.applicationName,
    defaults: {
      title: appConfig.defautTitle
    }
  });
};

@NgModule({
  providers: [
    { provide: ErrorHandler, useClass: CommonErrorHandler },
    ApiService,
    ResizeService,
    LoggerServiceDepHolder
  ]
})
export class AppSharedProvidersModule {
  constructor(injector: Injector) {
    LocatorService.Injector = injector;
  }
}

@NgModule({
  imports: [
    AppSharedProvidersModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      useDefaultLang: true,
      loader: {
        provide: TranslateLoader,
        useFactory: (translateHttpLoader),
        deps: [HttpClient]
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useFactory: (missingTranslationHandler),
        deps: [LoggerServiceDepHolder]
      }
    }),
    MetaModule.forRoot({
      provide: MetaLoader,
      useFactory: (metaFactory),
      deps: [TranslateService]
    })
  ]
})
export class AppSharedImportsModule { }

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent
  ],
  exports: [
    AppComponent,
    DefaultComponent
  ],
  imports: [
    AppSharedImportsModule
  ]
})
export class AppSharedModule { }

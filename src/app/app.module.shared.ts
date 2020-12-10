import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, forwardRef, Inject, Injectable, Injector, NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { MetaLoader, MetaModule, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core';
import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MessageService } from 'primeng/api';
import { ProgressBarModule } from 'primeng/progressbar';
import { appConfig } from 'src/config/app.config';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectComponent } from './components/connect/connect.component';
import { DefaultComponent } from './components/default/default.component';
import { ApiModule } from './generated/api.module';
import { LoggerService, LoggerServiceToken } from './interfaces/logger.service';
import { ApiService } from './services/api.service';
import { BackButtonGuard } from './services/back-button.guard';
import { ClanWarsHistoryService } from './services/clanwars-history.service';
import { ClientIdHttpInterceptor } from './services/client-id.http-interceptor';
import { ClientVersionHttpInterceptor } from './services/client-version.http-interceptor';
import { CommonErrorHandler } from './services/common-error.handler';
import { CustomMissingTranslationHandler } from './services/custom-missing-translation.handler';
import { LivefeedService } from './services/livefeed.service';
import { LocatorService } from './services/locator.service';
import { RegionRequestInterceptor } from './services/region-request.interceptor';
import { ResizeService } from './services/resize.service';
import { ScrollService } from './services/scroll.service';

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

export const API_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useExisting: forwardRef(() => RegionRequestInterceptor),
  multi: true
};

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    ConnectComponent
  ],
  exports: [
    AppComponent,
    DefaultComponent,
    ConnectComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoadingBarRouterModule,
    LoadingBarHttpClientModule,
    ApiModule.forRoot({ rootUrl: environment.apiUrl }),
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
    }),
    ProgressBarModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: CommonErrorHandler },
    RegionRequestInterceptor,
    API_INTERCEPTOR_PROVIDER,
    ApiService,
    ResizeService,
    LoggerServiceDepHolder,
    MessageService,
    ClientIdHttpInterceptor,
    ClientVersionHttpInterceptor,
    LivefeedService,
    ClanWarsHistoryService,
    ScrollService,
    BackButtonGuard
  ]
})
export class AppSharedModule {
  constructor(injector: Injector) {
    LocatorService.Injector = injector;
  }
}

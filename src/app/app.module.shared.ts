import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, forwardRef, Inject, Injectable, Injector, NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ConnectComponent } from '@components/connect/connect.component';
import { DefaultComponent } from '@components/default/default.component';
import { appConfig } from '@config/app.config';
import { environment } from '@environments/environment';
import { ApiModule } from '@generated/api.module';
import { LoggerService, LoggerServiceToken } from '@interfaces/logger.service';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateParser, TranslateService } from '@ngx-translate/core';
import { ApiService } from '@services/api.service';
import { AppInitService } from '@services/app-init.service';
import { ClanWarsHistoryService } from '@services/clanwars-history.service';
import { ClientIdHttpInterceptor } from '@services/client-id.http-interceptor';
import { ClientVersionHttpInterceptor } from '@services/client-version.http-interceptor';
import { CommonErrorHandler } from '@services/common-error.handler';
import { CustomMissingTranslationHandler } from '@services/custom-missing-translation.handler';
import { LivefeedService } from '@services/livefeed.service';
import { RegionRequestInterceptor } from '@services/region-request.interceptor';
import { ResizeService } from '@services/resize.service';
import { ScrollService } from '@services/scroll.service';
import { CoreModule, CustomDefaultTranslateHttpLoader, CustomTranslateParser, ErrorModule, LocatorService } from '@stewie/framework';
import { MetaLoader, MetaModule, MetaStaticLoader, PageTitlePositioning } from '@stewie/meta';
import { MessageService } from 'primeng/api';
import { ProgressBarModule } from 'primeng/progressbar';
import { of } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import { AppActivator, AppComponent, AppWrapperComponent } from './app.component';

const translateHttpLoader = (http: HttpClient) => {
  return new CustomDefaultTranslateHttpLoader(http, './assets/i18n/', '.json');
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
    callback: (key: string) => {
      if (key.startsWith('/')) {
        return of(key);
      }
      return translate.get(key);
    },
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    pageTitleSeparator: ' - ',
    applicationName: appConfig.defautTitle,
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
    AppWrapperComponent,
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
    CoreModule.forRoot(environment.production),
    HttpClientModule,
    LoadingBarRouterModule,
    LoadingBarHttpClientModule,
    ApiModule.forRoot({ rootUrl: environment.apiUrl }),
    AppRoutingModule,
    ErrorModule.withConfig({ customErrorCodes: [] }),
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
      },
      parser: {
        provide: TranslateParser,
        useClass: CustomTranslateParser
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
    AppInitService,
    AppActivator,
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
    ScrollService
  ]
})
export class AppSharedModule {
  constructor(injector: Injector) {
    LocatorService.Injector = injector;
  }
}

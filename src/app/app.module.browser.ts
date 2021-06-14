import { NgModule } from '@angular/core';
import { ServiceWorkerModule, SwUpdate } from '@angular/service-worker';
import { Config } from '@config/config';
import { environment } from '@environments/environment';
import { AppComponent } from './app.component';
import { AppSharedModule } from './app.module.shared';
import { AnalyticsServiceToken } from '@interfaces/analytics.service';
import { ConfigServiceToken } from '@interfaces/config.service';
import { ElectronServiceToken } from '@interfaces/electron.service';
import { LoggerService, LoggerServiceToken } from '@interfaces/logger.service';
import { SignalrServiceToken } from '@interfaces/signalr.service';
import { UpdateServiceToken } from '@interfaces/update.service';
import { ConsoleLoggerService } from '@services/browser/console.logger.service';
import { BrowserElectronService } from '@services/browser/electron.service';
import { BrowserGoogleAnalyticsService } from '@services/browser/google-analytics.service';
import { LocalStorageConfigService } from '@services/browser/local-storage.config.service';
import { ServiceWorkerUpdateService } from '@services/browser/service-worker-update.service';
import { CommonSignalrService } from '@services/common-signalr.service';
import { DummyAnalyticsService } from '@services/dummy-analytics.service';
import { DummyUpdateService } from '@services/dummy-update.service';

const updateServiceFactory = (swUpdate?: SwUpdate, logger?: LoggerService) => {
  return environment.production
    ? new ServiceWorkerUpdateService(swUpdate, logger)
    : new DummyUpdateService();
};

const analyticsServiceFactory = (config: Config) => {
  return environment.production ? new BrowserGoogleAnalyticsService(config) : new DummyAnalyticsService();
}


@NgModule({
  declarations: [],
  imports: [
    AppSharedModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    { provide: ConfigServiceToken, useClass: LocalStorageConfigService },
    { provide: LoggerServiceToken, useClass: ConsoleLoggerService },
    { provide: SignalrServiceToken, useClass: CommonSignalrService },
    { provide: UpdateServiceToken, useFactory: updateServiceFactory, deps: [SwUpdate, LoggerServiceToken] },
    { provide: AnalyticsServiceToken, useFactory: analyticsServiceFactory, deps: [Config] },
    { provide: ElectronServiceToken, useClass: BrowserElectronService },
    Config
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { ServiceWorkerModule, SwUpdate } from '@angular/service-worker';
import { environment } from '@environments/environment';
import { AnalyticsServiceToken } from '@interfaces/analytics.service';
import { ElectronServiceToken } from '@interfaces/electron.service';
import { LoggerService, LoggerServiceToken } from '@interfaces/logger.service';
import { UpdateServiceToken } from '@interfaces/update.service';
import { ConsoleLoggerService } from '@services/browser/console.logger.service';
import { BrowserElectronService } from '@services/browser/electron.service';
import { BrowserGoogleAnalyticsService } from '@services/browser/google-analytics.service';
import { ServiceWorkerUpdateService } from '@services/browser/service-worker-update.service';
import { DummyAnalyticsService } from '@services/dummy-analytics.service';
import { DummyUpdateService } from '@services/dummy-update.service';
import { SettingsService } from '@services/settings.service';
import { AppWrapperComponent } from './app.component';
import { AppSharedModule } from './app.module.shared';

const updateServiceFactory = (swUpdate?: SwUpdate, logger?: LoggerService) => {
  return environment.production
    ? new ServiceWorkerUpdateService(swUpdate, logger)
    : new DummyUpdateService();
};

const analyticsServiceFactory = (settingsService: SettingsService) => {
  return environment.production ? new BrowserGoogleAnalyticsService(settingsService) : new DummyAnalyticsService();
};


@NgModule({
  declarations: [],
  imports: [
    AppSharedModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    { provide: LoggerServiceToken, useClass: ConsoleLoggerService },
    { provide: UpdateServiceToken, useFactory: updateServiceFactory, deps: [SwUpdate, LoggerServiceToken] },
    { provide: AnalyticsServiceToken, useFactory: analyticsServiceFactory, deps: [SettingsService] },
    { provide: ElectronServiceToken, useClass: BrowserElectronService }
  ],
  bootstrap: [AppWrapperComponent]
})
export class AppModule {
}

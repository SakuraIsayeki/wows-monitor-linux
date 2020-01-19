import { NgModule } from '@angular/core';
import { Config } from 'src/config/config';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { AppSharedModule } from './app.module.shared';
import { AnalyticsServiceToken } from './interfaces/analytics.service';
import { ConfigServiceToken } from './interfaces/config.service';
import { DirectoryServiceToken } from './interfaces/directory.service';
import { LoggerServiceToken } from './interfaces/logger.service';
import { SignalrServiceToken } from './interfaces/signalr.service';
import { UpdateServiceToken } from './interfaces/update.service';
import { CommonSignalrService } from './services/common-signalr.service';
import { ElectronLoggerService } from './services/desktop/electron-logger.service';
import { ElectronUpdateService } from './services/desktop/electron-update.service';
import { ElectronService } from './services/desktop/electron.service';
import { FsConfigService } from './services/desktop/fs-config.service';
import { FsDirectoryService } from './services/desktop/fs-directory.service';
import { DesktopGoogleAnalyticsService } from './services/desktop/google-analytics.service';
import { DummyAnalyticsService } from './services/dummy-analytics.service';

const analyticsServiceFactory = (config: Config, electronService: ElectronService) => {
  return environment.production ? new DesktopGoogleAnalyticsService(config, electronService) : new DummyAnalyticsService();
};


@NgModule({
  providers: [
    { provide: ConfigServiceToken, useClass: FsConfigService },
    { provide: DirectoryServiceToken, useClass: FsDirectoryService },
    { provide: UpdateServiceToken, useClass: ElectronUpdateService, deps: [ElectronService, Config, LoggerServiceToken] },
    { provide: LoggerServiceToken, useClass: ElectronLoggerService },
    { provide: SignalrServiceToken, useClass: CommonSignalrService },
    { provide: AnalyticsServiceToken, useFactory: analyticsServiceFactory, deps: [Config, ElectronService] },
    Config,
    ElectronService
  ]
})
export class AppProvidersModule { }

@NgModule({
  declarations: [],
  imports: [
    AppSharedModule,
    AppProvidersModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

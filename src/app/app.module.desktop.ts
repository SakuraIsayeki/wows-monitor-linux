import { NgModule } from '@angular/core';
import { AnalyticsServiceToken } from '@interfaces/analytics.service';
import { DirectoryServiceToken } from '@interfaces/directory.service';
import { ElectronService, ElectronServiceToken } from '@interfaces/electron.service';
import { LoggerServiceToken } from '@interfaces/logger.service';
import { UpdateServiceToken } from '@interfaces/update.service';
import { DesktopDeviceUuidService } from '@services/desktop/desktop-device-uuid.service';
import { ElectronLoggerService } from '@services/desktop/electron-logger.service';
import { ElectronUpdateService } from '@services/desktop/electron-update.service';
import { DesktopElectronService } from '@services/desktop/electron.service';
import { FsDirectoryService } from '@services/desktop/fs-directory.service';
import { DesktopGoogleAnalyticsService } from '@services/desktop/google-analytics.service';
import { ScreenshotService } from '@services/desktop/screenshot.service';
import { DeviceUuidServiceToken } from '@services/device-uuid.service';
import { SettingsService } from '@services/settings.service';
import { AppWrapperComponent } from './app.component';
import { AppSharedModule } from './app.module.shared';

// const analyticsServiceFactory = (settingsService: SettingsService, electronService: ElectronService, ) => {
//   return new DesktopGoogleAnalyticsService(settingsService, electronService);
// };


@NgModule({
  providers: [
    { provide: DirectoryServiceToken, useClass: FsDirectoryService },
    { provide: UpdateServiceToken, useClass: ElectronUpdateService, deps: [ElectronServiceToken, SettingsService, LoggerServiceToken] },
    { provide: LoggerServiceToken, useClass: ElectronLoggerService },
    { provide: AnalyticsServiceToken, useClass: DesktopGoogleAnalyticsService },
    { provide: ElectronServiceToken, useClass: DesktopElectronService },
    { provide: DeviceUuidServiceToken, useClass: DesktopDeviceUuidService },
    ElectronService,
    ScreenshotService
  ]
})
export class AppProvidersModule {
}

@NgModule({
  declarations: [],
  imports: [
    AppSharedModule,
    AppProvidersModule
  ],
  bootstrap: [AppWrapperComponent]
})
export class AppModule {
}

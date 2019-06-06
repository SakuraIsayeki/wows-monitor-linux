import { NgModule } from '@angular/core';
import { ServiceWorkerModule, SwUpdate } from '@angular/service-worker';
import { Config } from 'src/config/config';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { AppSharedModule } from './app.module.shared';
import { ConfigServiceToken } from './interfaces/config.service';
import { LoggerServiceToken } from './interfaces/logger.service';
import { SignalrServiceToken } from './interfaces/signalr.service';
import { UpdateServiceToken } from './interfaces/update.service';
import { ConsoleLoggerService } from './services/browser/console.logger.service';
import { LocalStorageConfigService } from './services/browser/local-storage.config.service';
import { ServiceWorkerUpdateService } from './services/browser/service-worker-update.service';
import { CommonSignalrService } from './services/common-signalr.service';
import { DummyUpdateService } from './services/dummy-update.service';

const updateServiceFactory = (swUpdate?: SwUpdate) => {
  return environment.production
    ? new ServiceWorkerUpdateService(swUpdate)
    : new DummyUpdateService();
};

@NgModule({
  declarations: [],
  imports: [
    AppSharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    { provide: ConfigServiceToken, useClass: LocalStorageConfigService },
    { provide: LoggerServiceToken, useClass: ConsoleLoggerService },
    { provide: SignalrServiceToken, useClass: CommonSignalrService },
    { provide: UpdateServiceToken, useFactory: updateServiceFactory, deps: [SwUpdate] },
    Config
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

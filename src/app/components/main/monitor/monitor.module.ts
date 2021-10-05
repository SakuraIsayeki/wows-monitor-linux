import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MonitorDisplayModule } from '@components/main/monitor/monitor-display.module';
import { TranslateModule } from '@ngx-translate/core';
import { MonitorRoutingModule } from './monitor-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MonitorRoutingModule,
    TranslateModule.forChild(),
    MonitorDisplayModule
  ],
  providers: []
})
export class MonitorModule {
}

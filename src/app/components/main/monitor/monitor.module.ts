import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MonitorRoutingModule } from './monitor-routing.module';
import { MonitorComponent } from './monitor.component';


@NgModule({
  declarations: [
    MonitorComponent
  ],
  imports: [
    CommonModule,
    MonitorRoutingModule,
    CardModule,
    ScrollPanelModule
  ],
  providers: [
  ]
})
export class MonitorModule { }

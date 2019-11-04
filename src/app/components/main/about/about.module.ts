import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { SharedModule } from 'primeng/components/common/shared';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';


@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
    CardModule,
    SharedModule
  ]
})
export class AboutModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ConfigtoolRoutingModule } from './configtool-routing.module';
import { ConfigtoolComponent } from './configtool.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ConfigtoolComponent],
  imports: [
    CommonModule,
    ConfigtoolRoutingModule,
    CardModule,
    SharedModule
  ]
})
export class ConfigtoolModule { }

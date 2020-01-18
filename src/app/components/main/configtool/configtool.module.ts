import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfigtoolRoutingModule } from './configtool-routing.module';
import { ConfigtoolComponent } from './configtool.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [ConfigtoolComponent],
  imports: [
    CommonModule,
    ConfigtoolRoutingModule,
    CardModule,
    SharedModule,
    TranslateModule.forChild(),
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ConfigtoolModule { }

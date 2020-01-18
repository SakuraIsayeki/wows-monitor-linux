import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfigtoolRoutingModule } from './configtool-routing.module';
import { ConfigtoolComponent } from './configtool.component';

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
    InputSwitchModule,
    ScrollPanelModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ConfigtoolModule { }

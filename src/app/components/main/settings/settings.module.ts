import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { DropdownModule } from 'primeng/dropdown';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SettingsRoutingModule,
    SharedModule,
    TranslateModule,
    CardModule,
    SelectButtonModule,
    InputSwitchModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    FontAwesomeModule
  ],
  providers: [
  ]
})
export class SettingsModule { }

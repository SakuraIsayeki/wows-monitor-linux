import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileResolver } from '@components/main/profile/profile.resolver';
import { TranslateModule } from '@ngx-translate/core';
import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    CardModule,
    TranslateModule,
    TableModule,
    CheckboxModule,
    FormsModule,
    ButtonModule,
    BlockUIModule,
    TooltipModule
  ],
  providers: [
    ProfileResolver
  ]
})
export class ProfileModule {
}

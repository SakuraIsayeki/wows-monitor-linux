import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from '@shared/shared.module';
import { ChangelogModule } from './changelog/changelog.module';
import { ChangelogsResolver } from './changelogs-resolver';
import { ChangelogsRoutingModule } from './changelogs-routing.module';
import { ChangelogsComponent } from './changelogs.component';


@NgModule({
  declarations: [
    ChangelogsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ChangelogsRoutingModule,
    TranslateModule,
    ChangelogModule,
    CardModule,
    DropdownModule,
    ButtonModule
  ],
  providers: [
    ChangelogsResolver
  ]
})
export class ChangelogsModule { }

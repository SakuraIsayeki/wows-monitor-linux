import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChangelogsRoutingModule } from './changelogs-routing.module';
import { ChangelogsComponent } from './changelogs.component';
import { ChangelogModule } from './changelog/changelog.module';


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
    ButtonModule
  ],
  providers: [
  ]
})
export class ChangelogsModule { }

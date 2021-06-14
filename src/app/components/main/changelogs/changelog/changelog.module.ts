import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';
import { ChangelogComponent } from './changelog.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    ChangelogComponent
  ],
  exports: [
    ChangelogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    ButtonModule
  ],
  providers: [
  ],
  entryComponents: [ChangelogComponent]
})
export class ChangelogModule { }

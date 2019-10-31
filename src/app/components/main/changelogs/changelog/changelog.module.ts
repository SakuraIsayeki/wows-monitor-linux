import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChangelogComponent } from './changelog.component';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { ButtonModule } from 'primeng/button';

export function markedOptionsFactory(): MarkedOptions {
  return {
    gfm: true,
    smartLists: true
  };
}

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
    ButtonModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory
      }
    })
  ],
  providers: [
  ],
  entryComponents: [ChangelogComponent]
})
export class ChangelogModule { }

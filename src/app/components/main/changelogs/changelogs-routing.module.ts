import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangelogsComponent } from './changelogs.component';
import { ChangelogsResolver } from './changelogs-resolver';

const routes: Routes = [
  {
    path: '',
    component: ChangelogsComponent,
    resolve: {
      changelogs: ChangelogsResolver
    },
    data: {
      meta: {
        title: 'meta.changelogs.title'
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangelogsRoutingModule { }

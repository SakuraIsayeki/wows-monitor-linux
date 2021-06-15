import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StRoutes } from '@stewie/framework';
import { AboutComponent } from './about.component';

const routes: StRoutes = [
  {
    path: '',
    component: AboutComponent,
    data: {
      meta: {
        title: 'meta.about.title'
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }

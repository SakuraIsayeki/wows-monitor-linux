import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    data: {
      meta: {
        title: 'meta.main.title'
      }
    },
    children: [
      {
        path: 'about',
        loadChildren: './about/about.module#AboutModule',
        data: {
          meta: {
            title: 'meta.about.title'
          }
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

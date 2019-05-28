import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';
import { DefaultComponent } from './components/default/default.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [MetaGuard],
    children: [
      {
        path: '',
        component: DefaultComponent,
        data: {
          meta: {
            title: 'meta.default.title'
          }
        }
      },
      {
        path: 'home',
        loadChildren: './components/main/main.module#MainModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

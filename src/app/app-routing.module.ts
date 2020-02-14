import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';
import { ConnectComponent } from './components/connect/connect.component';
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
        loadChildren: () => import('./components/main/main.module').then(m => m.MainModule)
      },
      {
        path: 'connect/:token',
        component: ConnectComponent
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StRoutes } from '@stewie/framework';
import { MetaGuard } from '@stewie/meta';
import { ConnectComponent } from '@components/connect/connect.component';
import { DefaultComponent } from '@components/default/default.component';
import { BackButtonGuard } from '@services/back-button.guard';

const routes: StRoutes = [
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
        loadChildren: () => import('./components/main/main.module').then(m => m.MainModule),
        canDeactivate: [BackButtonGuard]
      },
      {
        path: 'connect/:token',
        component: ConnectComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

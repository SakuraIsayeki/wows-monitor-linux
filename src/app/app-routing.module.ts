import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConnectComponent } from '@components/connect/connect.component';
import { StRoutes } from '@stewie/framework';
import { MetaGuard } from '@stewie/meta';
import { AppActivator, AppComponent } from './app.component';

const routes: StRoutes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [AppActivator],
    canActivateChild: [MetaGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./components/main/main.module').then(m => m.MainModule)
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

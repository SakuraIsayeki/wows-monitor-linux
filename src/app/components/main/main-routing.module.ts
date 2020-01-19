import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { environment } from 'src/environments/environment';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    data: {
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./monitor/monitor.module').then(m => m.MonitorModule)
      },
      {
        path: 'changelogs',
        loadChildren: () => import('./changelogs/changelogs.module').then(m => m.ChangelogsModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'configtool',
        loadChildren: () => import('./configtool/configtool.module').then(m => m.ConfigtoolModule)
      }
    ]
  }
];

if (environment.browser) {
  routes[0].children.splice(routes[0].children.length);
}

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

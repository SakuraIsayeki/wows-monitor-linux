import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackButtonGuard } from '@services/back-button.guard';
import { environment } from '@environments/environment';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    data: {
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./monitor/monitor.module').then(m => m.MonitorModule),
        canDeactivate: [BackButtonGuard]
      },
      {
        path: 'changelogs',
        loadChildren: () => import('./changelogs/changelogs.module').then(m => m.ChangelogsModule),
        canDeactivate: [BackButtonGuard]
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
        canDeactivate: [BackButtonGuard]
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
        canDeactivate: [BackButtonGuard]
      },
      {
        path: 'configtool',
        loadChildren: () => import('./configtool/configtool.module').then(m => m.ConfigtoolModule),
        canDeactivate: [BackButtonGuard]
      },
      {
        path: 'clanwars',
        loadChildren: () => import('./clanwars/clanwars.module').then(m => m.ClanwarsModule),
        canDeactivate: [BackButtonGuard]
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

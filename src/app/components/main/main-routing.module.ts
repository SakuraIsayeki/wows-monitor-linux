import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '@environments/environment';
import { AuthGuard, StRoutes } from '@stewie/framework';
import { MainComponent } from './main.component';

const routes: StRoutes = [
  {
    path: '',
    component: MainComponent,
    data: {},
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
      },
      {
        path: 'clanwars',
        loadChildren: () => import('./clanwars/clanwars.module').then(m => m.ClanwarsModule)
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'match-history',
        loadChildren: () => import('./match-history/match-history.module').then(m => m.MatchHistoryModule),
        canActivate: [AuthGuard],
      }
    ]
  },
];

if (environment.browser) {
  routes[0].children.splice(routes[0].children.length);
}

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}

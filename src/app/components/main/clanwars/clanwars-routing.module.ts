import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StRoutes } from '@stewie/framework';
import { ClanwarsComponent } from './clanwars.component';
import { HistoryClanComponent } from './history/history-clan/history-clan.component';
import { HistoryClanResolver } from './history/history-clan/history-clan.resolver';
import { HistoryComponent } from './history/history.component';
import { LivefeedComponent } from './livefeed/livefeed.component';

const routes: StRoutes = [
  {
    path: '',
    component: ClanwarsComponent,
    children: [
      {
        path: 'livefeed',
        component: LivefeedComponent,
        data: {
          meta: {
            title: 'meta.livefeed.title'
          }
        }
      },
      {
        path: ':clanId',
        component: HistoryClanComponent,
        resolve: {
          clan: HistoryClanResolver
        },
        data: {
          meta: {
            title: 'meta.clanwars.title'
          }
        }
      },
      {
        path: ':clanId/:season',
        component: HistoryClanComponent,
        resolve: {
          clan: HistoryClanResolver
        },
        data: {
          meta: {
            title: 'meta.clanwars.title'
          }
        }
      },
      {
        path: '',
        component: HistoryComponent,
        data: {
          meta: {
            title: 'meta.clanwars.title'
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
export class ClanwarsRoutingModule {
}

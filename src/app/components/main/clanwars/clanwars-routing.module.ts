import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClanwarsComponent } from './clanwars.component';
import { HistoryClanComponent } from './history/history-clan/history-clan.component';
import { HistoryComponent } from './history/history.component';
import { LivefeedComponent } from './livefeed/livefeed.component';
import { HistoryClanResolver } from './history/history-clan/history-clan.resolver';

const routes: Routes = [
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
export class ClanwarsRoutingModule { }

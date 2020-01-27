import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClanwarsComponent } from './clanwars.component';
import { LivefeedComponent } from './livefeed/livefeed.component';
import { HistoryComponent } from './history/history.component';

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

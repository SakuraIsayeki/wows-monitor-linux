import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchHistoryDetailComponent } from '@components/main/match-history/match-history-detail/match-history-detail.component';
import { MatchHistoryDetailResolver } from '@components/main/match-history/match-history-detail/match-history-detail.resolver';
import { MatchHistoryMapsResolver } from '@components/main/match-history/match-history-maps.resolver';
import { MatchHistoryShipsResolver } from '@components/main/match-history/match-history-ships.resolver';
import { MatchHistoryResolver } from '@components/main/match-history/match-history.resolver';
import { MatchHistoryComponent } from './match-history.component';

const routes: Routes = [
  {
    path: '',
    component: MatchHistoryComponent,
    resolve: {
      list: MatchHistoryResolver,
      maps: MatchHistoryMapsResolver,
      ships: MatchHistoryShipsResolver
    },
    data: {
      meta: {
        title: 'meta.matchHistory.title'
      }
    }
  },
  {
    path: ':id',
    component: MatchHistoryDetailComponent,
    resolve: {
      match: MatchHistoryDetailResolver
    },
    data: {
      meta: {
        title: 'meta.matchHistory.title'
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchHistoryRoutingModule {
}

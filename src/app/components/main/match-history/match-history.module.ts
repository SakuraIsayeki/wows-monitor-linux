import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatchHistoryDetailResolver } from '@components/main/match-history/match-history-detail/match-history-detail.resolver';
import { MatchHistoryMapsResolver } from '@components/main/match-history/match-history-maps.resolver';
import { MatchHistoryShipsResolver } from '@components/main/match-history/match-history-ships.resolver';
import { MatchHistoryResolver } from '@components/main/match-history/match-history.resolver';
import { MonitorDisplayModule } from '@components/main/monitor/monitor-display.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatchHistoryService } from '@generated/services';
import { TranslateModule } from '@ngx-translate/core';
import { MatchHistoryListService } from '@services/match-history-list.service';
import { SharedModule } from '@shared/shared.module';
import { PipesModule, UseUtcModule } from '@stewie/framework';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TooltipModule } from 'primeng/tooltip';
import { MatchHistoryDetailComponent } from './match-history-detail/match-history-detail.component';

import { MatchHistoryRoutingModule } from './match-history-routing.module';
import { MatchHistoryComponent } from './match-history.component';


@NgModule({
  declarations: [
    MatchHistoryComponent,
    MatchHistoryDetailComponent
  ],
  imports: [
    CommonModule,
    MatchHistoryRoutingModule,
    TranslateModule,
    CardModule,
    PaginatorModule,
    CalendarModule,
    ReactiveFormsModule,
    UseUtcModule,
    MultiSelectModule,
    SharedModule,
    PipesModule,
    FontAwesomeModule,
    TooltipModule,
    MonitorDisplayModule,
    SplitButtonModule
  ],
  providers: [
    MatchHistoryService,
    MatchHistoryListService,
    MatchHistoryResolver,
    MatchHistoryMapsResolver,
    MatchHistoryShipsResolver,
    MatchHistoryDetailResolver
  ]
})
export class MatchHistoryModule {
}

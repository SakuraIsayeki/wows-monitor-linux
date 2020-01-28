import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClanSearchComponent } from './clan-search/clan-search.component';
import { ClanwarsRoutingModule } from './clanwars-routing.module';
import { ClanwarsComponent } from './clanwars.component';
import { GeneralFilterComponent } from './general-filter/general-filter.component';
import { HistoryClanComponent } from './history/history-clan/history-clan.component';
import { HistoryClanResolver } from './history/history-clan/history-clan.resolver';
import { HistoryComponent } from './history/history.component';
import { FavoriteInputComponent } from './livefeed-filter/favorite-input/favorite-input.component';
import { LivefeedFilterComponent } from './livefeed-filter/livefeed-filter.component';
import { LivefeedComponent } from './livefeed/livefeed.component';
import { MatchItemTeamComponent } from './match-item/match-item-team/match-item-team.component';
import { MatchItemComponent } from './match-item/match-item.component';


@NgModule({
  declarations: [
    ClanwarsComponent,
    LivefeedComponent,
    HistoryComponent,
    MatchItemComponent,
    MatchItemTeamComponent,
    LivefeedFilterComponent,
    GeneralFilterComponent,
    HistoryClanComponent,
    FavoriteInputComponent,
    ClanSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FontAwesomeModule,
    TranslateModule,
    ClanwarsRoutingModule,
    CardModule,
    DropdownModule,
    InputSwitchModule,
    AutoCompleteModule,
    CalendarModule,
    CheckboxModule,
    MultiSelectModule,
    ChipsModule,
    PaginatorModule,
    ProgressBarModule
  ],
  providers: [
    HistoryClanResolver
  ]
})
export class ClanwarsModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ValueLabelComponent } from '@components/main/monitor/value-label/value-label.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TooltipModule } from 'primeng/tooltip';
import { MonitorRoutingModule } from './monitor-routing.module';
import { MonitorComponent } from './monitor.component';
import { PlayerComponent } from './player/player.component';

import { StatAccBattlesComponent } from './player/stat-acc-battles/stat-acc-battles.component';
import { StatAccWrComponent } from './player/stat-acc-wr/stat-acc-wr.component';
import { StatBaseComponent } from './player/stat-base/stat-base.component';
import { StatKarmaComponent } from './player/stat-karma/stat-karma.component';
import { StatShipBattlesComponent } from './player/stat-ship-battles/stat-ship-battles.component';
import { StatShipDamageComponent } from './player/stat-ship-damage/stat-ship-damage.component';
import { StatShipFragsComponent } from './player/stat-ship-frags/stat-ship-frags.component';
import { StatShipPrComponent } from './player/stat-ship-pr/stat-ship-pr.component';
import { StatShipWinsComponent } from './player/stat-ship-wins/stat-ship-wins.component';
import { StatShipWrComponent } from './player/stat-ship-wr/stat-ship-wr.component';
import { StatShipXpComponent } from './player/stat-ship-xp/stat-ship-xp.component';
import { TeamComponent } from './team/team.component';
import { TeamStatBaseComponent } from './team/team-stat-base/team-stat-base.component';
import { TeamStatShipXpComponent } from './team/team-stat-ship-xp/team-stat-ship-xp.component';
import { TeamStatShipWrComponent } from './team/team-stat-ship-wr/team-stat-ship-wr.component';
import { TeamStatShipBattlesComponent } from './team/team-stat-ship-battles/team-stat-ship-battles.component';
import { TeamStatAccXpComponent } from './team/team-stat-acc-xp/team-stat-acc-xp.component';
import { TeamStatAccWrComponent } from './team/team-stat-acc-wr/team-stat-acc-wr.component';
import { TeamStatAccBattlesComponent } from './team/team-stat-acc-battles/team-stat-acc-battles.component';
import { TeamOverlayComponent } from './team/team-overlay/team-overlay.component';
import { TeamOverlayRatingComponent } from './team/team-overlay/team-overlay-rating/team-overlay-rating.component';

@NgModule({
  declarations: [
    MonitorComponent,
    PlayerComponent,
    TeamComponent,
    ValueLabelComponent,
    StatBaseComponent,
    StatAccBattlesComponent,
    StatAccWrComponent,
    StatKarmaComponent,
    StatShipBattlesComponent,
    StatShipDamageComponent,
    StatShipFragsComponent,
    StatShipPrComponent,
    StatShipWinsComponent,
    StatShipWrComponent,
    StatShipXpComponent,
    TeamStatBaseComponent,
    TeamStatShipXpComponent,
    TeamStatShipWrComponent,
    TeamStatShipBattlesComponent,
    TeamStatAccXpComponent,
    TeamStatAccWrComponent,
    TeamStatAccBattlesComponent,
    TeamOverlayComponent,
    TeamOverlayRatingComponent
  ],
  imports: [
    CommonModule,
    MonitorRoutingModule,
    SharedModule,
    CardModule,
    ScrollPanelModule,
    DialogModule,
    ContextMenuModule,
    MenuModule,
    TooltipModule,
    FontAwesomeModule,
    TranslateModule.forChild(),
    OverlayPanelModule,
    ButtonModule
  ],
  providers: []
})
export class MonitorModule {
}

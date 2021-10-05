import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MonitorComponent } from '@components/main/monitor/monitor.component';
import { PlayerOverlayComponent } from '@components/main/monitor/player/player-overlay/player-overlay.component';
import { PlayerComponent } from '@components/main/monitor/player/player.component';
import { StatAccBattlesComponent } from '@components/main/monitor/player/stat-acc-battles/stat-acc-battles.component';
import { StatAccWrComponent } from '@components/main/monitor/player/stat-acc-wr/stat-acc-wr.component';
import { StatKarmaComponent } from '@components/main/monitor/player/stat-karma/stat-karma.component';
import { StatShipBattlesComponent } from '@components/main/monitor/player/stat-ship-battles/stat-ship-battles.component';
import { StatShipDamageComponent } from '@components/main/monitor/player/stat-ship-damage/stat-ship-damage.component';
import { StatShipFragsComponent } from '@components/main/monitor/player/stat-ship-frags/stat-ship-frags.component';
import { StatShipPrComponent } from '@components/main/monitor/player/stat-ship-pr/stat-ship-pr.component';
import { StatShipWinsComponent } from '@components/main/monitor/player/stat-ship-wins/stat-ship-wins.component';
import { StatShipWrComponent } from '@components/main/monitor/player/stat-ship-wr/stat-ship-wr.component';
import { StatShipXpComponent } from '@components/main/monitor/player/stat-ship-xp/stat-ship-xp.component';
import { TeamOverlayRatingComponent } from '@components/main/monitor/team/team-overlay/team-overlay-rating/team-overlay-rating.component';
import { TeamOverlayComponent } from '@components/main/monitor/team/team-overlay/team-overlay.component';
import { TeamStatAccBattlesComponent } from '@components/main/monitor/team/team-stat-acc-battles/team-stat-acc-battles.component';
import { TeamStatAccWrComponent } from '@components/main/monitor/team/team-stat-acc-wr/team-stat-acc-wr.component';
import { TeamStatAccXpComponent } from '@components/main/monitor/team/team-stat-acc-xp/team-stat-acc-xp.component';
import { TeamStatBaseComponent } from '@components/main/monitor/team/team-stat-base/team-stat-base.component';
import { TeamStatShipBattlesComponent } from '@components/main/monitor/team/team-stat-ship-battles/team-stat-ship-battles.component';
import { TeamStatShipWrComponent } from '@components/main/monitor/team/team-stat-ship-wr/team-stat-ship-wr.component';
import { TeamStatShipXpComponent } from '@components/main/monitor/team/team-stat-ship-xp/team-stat-ship-xp.component';
import { TeamComponent } from '@components/main/monitor/team/team.component';
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
import { MonitorDisplayComponent } from './monitor-display/monitor-display.component';

export function declarations() {
  return [
    MonitorComponent,
    PlayerComponent,
    TeamComponent,
    ValueLabelComponent,
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
    TeamOverlayRatingComponent,
    PlayerOverlayComponent
  ];
}

@NgModule({
  declarations: [
    declarations(),
    MonitorDisplayComponent
  ],
  exports: [
    declarations(),
    MonitorDisplayComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    SharedModule,
    CardModule,
    ScrollPanelModule,
    DialogModule,
    ContextMenuModule,
    MenuModule,
    TooltipModule,
    FontAwesomeModule,
    OverlayPanelModule,
    ButtonModule
  ]
})
export class MonitorDisplayModule {
}

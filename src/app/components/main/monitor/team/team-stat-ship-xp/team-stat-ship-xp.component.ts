import { Component, OnInit } from '@angular/core';
import { TeamStatBaseComponent } from '@components/main/monitor/team/team-stat-base/team-stat-base.component';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons/faLightbulb';
import { StatType } from '@generated/models/stat-type';

@Component({
  selector: 'team-stat-ship-xp',
  templateUrl: './team-stat-ship-xp.component.html'
})
export class TeamStatShipXpComponent extends TeamStatBaseComponent implements OnInit {

  icon = faLightbulb;

  constructor() {
    super(StatType.AvgXp);
  }

  ngOnInit(): void {
  }

}

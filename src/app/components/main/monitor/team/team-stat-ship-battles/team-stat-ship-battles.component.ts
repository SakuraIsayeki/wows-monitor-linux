import { Component, OnInit } from '@angular/core';
import { TeamStatBaseComponent } from '@components/main/monitor/team/team-stat-base/team-stat-base.component';
import { faGavel } from '@fortawesome/free-solid-svg-icons/faGavel';
import { StatType } from '@generated/models/stat-type';

@Component({
  selector: 'team-stat-ship-battles',
  templateUrl: './team-stat-ship-battles.component.html'
})
export class TeamStatShipBattlesComponent extends TeamStatBaseComponent implements OnInit {

  icon = faGavel;

  constructor() {
    super(StatType.Battles);
  }

  ngOnInit(): void {
  }

}

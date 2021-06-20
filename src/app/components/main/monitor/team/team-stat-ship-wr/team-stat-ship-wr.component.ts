import { Component, OnInit } from '@angular/core';
import { TeamStatBaseComponent } from '@components/main/monitor/team/team-stat-base/team-stat-base.component';
import { faTrophy } from '@fortawesome/free-solid-svg-icons/faTrophy';
import { StatType } from '@generated/models/stat-type';

@Component({
  selector: 'team-stat-ship-wr',
  templateUrl: './team-stat-ship-wr.component.html'
})
export class TeamStatShipWrComponent extends TeamStatBaseComponent implements OnInit {

  icon = faTrophy;

  constructor() {
    super(StatType.Wr);
  }

  ngOnInit(): void {
  }

}


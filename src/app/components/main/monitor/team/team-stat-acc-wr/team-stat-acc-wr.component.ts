import { Component, OnInit } from '@angular/core';
import { TeamStatBaseComponent } from '@components/main/monitor/team/team-stat-base/team-stat-base.component';
import { faTrophy } from '@fortawesome/free-solid-svg-icons/faTrophy';
import { StatType } from '@generated/models/stat-type';

@Component({
  selector: 'team-stat-acc-wr',
  templateUrl: './team-stat-acc-wr.component.html'
})
export class TeamStatAccWrComponent extends TeamStatBaseComponent implements OnInit {

  icon = faTrophy;

  constructor() {
    super(StatType.AccWr);
  }

  ngOnInit(): void {
  }

}

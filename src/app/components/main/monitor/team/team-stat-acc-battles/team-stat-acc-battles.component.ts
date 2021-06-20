import { Component, OnInit } from '@angular/core';
import { TeamStatBaseComponent } from '@components/main/monitor/team/team-stat-base/team-stat-base.component';
import { faGavel } from '@fortawesome/free-solid-svg-icons/faGavel';
import { StatType } from '@generated/models';

@Component({
  selector: 'team-stat-acc-battles',
  templateUrl: './team-stat-acc-battles.component.html'
})
export class TeamStatAccBattlesComponent extends TeamStatBaseComponent implements OnInit {

  icon = faGavel;

  constructor() {
    super(StatType.AccBattles);
  }

  ngOnInit(): void {
  }

}

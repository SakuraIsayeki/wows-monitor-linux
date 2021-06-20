import { Component, OnInit } from '@angular/core';
import { TeamStatBaseComponent } from '@components/main/monitor/team/team-stat-base/team-stat-base.component';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons/faLightbulb';
import { StatType } from '@generated/models/stat-type';

@Component({
  selector: 'team-stat-acc-xp',
  templateUrl: './team-stat-acc-xp.component.html'
})
export class TeamStatAccXpComponent extends TeamStatBaseComponent implements OnInit {

  icon = faLightbulb;

  constructor() {
    super(StatType.AccAvgXp);
  }

  ngOnInit(): void {
  }

}

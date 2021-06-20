import { Component, OnInit } from '@angular/core';
import { StatBaseComponent } from '@components/main/monitor/player/stat-base/stat-base.component';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons/faLightbulb';
import { StatType } from '@generated/models/stat-type';

@Component({
  selector: 'stat-ship-xp',
  templateUrl: './stat-ship-xp.component.html'
})
export class StatShipXpComponent extends StatBaseComponent implements OnInit {

  public icon = faLightbulb;

  constructor() {
    super(StatType.AvgXp, true);
  }

  ngOnInit(): void {
  }

}

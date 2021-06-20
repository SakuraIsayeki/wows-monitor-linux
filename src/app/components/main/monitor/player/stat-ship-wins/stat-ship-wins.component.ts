import { Component, OnInit } from '@angular/core';
import { StatBaseComponent } from '@components/main/monitor/player/stat-base/stat-base.component';
import { faExclamation } from '@fortawesome/free-solid-svg-icons/faExclamation';
import { StatType } from '@generated/models/stat-type';

@Component({
  selector: 'stat-ship-wins',
  templateUrl: './stat-ship-wins.component.html'
})
export class StatShipWinsComponent extends StatBaseComponent implements OnInit {

  public icon = faExclamation;

  constructor() {
    super(StatType.Wins, true);
  }

  ngOnInit(): void {
  }

}

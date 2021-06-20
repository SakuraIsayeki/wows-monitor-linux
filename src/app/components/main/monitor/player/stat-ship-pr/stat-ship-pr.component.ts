import { Component, OnInit } from '@angular/core';
import { StatBaseComponent } from '@components/main/monitor/player/stat-base/stat-base.component';
import { faExclamation } from '@fortawesome/free-solid-svg-icons/faExclamation';
import { StatType } from '@generated/models/stat-type';

@Component({
  selector: 'stat-ship-pr',
  templateUrl: './stat-ship-pr.component.html'
})
export class StatShipPrComponent extends StatBaseComponent implements OnInit {

  public icon = faExclamation;

  constructor() {
    super(StatType.Pr, true);
  }

  ngOnInit(): void {
  }

}

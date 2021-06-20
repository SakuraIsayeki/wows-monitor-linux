import { Component, OnInit } from '@angular/core';
import { StatBaseComponent } from '@components/main/monitor/player/stat-base/stat-base.component';
import { faSkull } from '@fortawesome/free-solid-svg-icons/faSkull';
import { StatType } from '@generated/models/stat-type';

@Component({
  selector: 'stat-ship-frags',
  templateUrl: './stat-ship-frags.component.html'
})
export class StatShipFragsComponent extends StatBaseComponent implements OnInit {

  public icon = faSkull;

  constructor() {
    super(StatType.AvgFrags, true);
  }

  ngOnInit(): void {
  }

}

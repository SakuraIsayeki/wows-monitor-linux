import { Component, OnInit } from '@angular/core';
import { StatBaseComponent } from '@components/main/monitor/player/stat-base/stat-base.component';
import { faFire } from '@fortawesome/free-solid-svg-icons/faFire';
import { StatType } from '@generated/models/stat-type';

@Component({
  selector: 'stat-ship-damage',
  templateUrl: './stat-ship-damage.component.html'
})
export class StatShipDamageComponent extends StatBaseComponent implements OnInit {

  public icon = faFire;

  constructor() {
    super(StatType.AvgDamage, true);
  }

  ngOnInit(): void {
  }

}

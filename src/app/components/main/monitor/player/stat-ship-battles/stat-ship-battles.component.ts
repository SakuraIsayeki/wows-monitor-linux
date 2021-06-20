import { Component, OnInit } from '@angular/core';
import { StatBaseComponent } from '@components/main/monitor/player/stat-base/stat-base.component';
import { faGavel } from '@fortawesome/free-solid-svg-icons/faGavel';
import { StatType } from '@generated/models/stat-type';

@Component({
  selector: 'stat-ship-battles',
  templateUrl: './stat-ship-battles.component.html'
})
export class StatShipBattlesComponent extends StatBaseComponent implements OnInit {

  public icon = faGavel;

  constructor() {
    super(StatType.Battles, true);
  }

  ngOnInit(): void {
  }

}

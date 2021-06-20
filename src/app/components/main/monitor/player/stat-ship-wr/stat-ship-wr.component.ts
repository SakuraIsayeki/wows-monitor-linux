import { Component, OnInit } from '@angular/core';
import { StatBaseComponent } from '@components/main/monitor/player/stat-base/stat-base.component';
import { faTrophy } from '@fortawesome/free-solid-svg-icons/faTrophy';
import { StatType } from '@generated/models/stat-type';

@Component({
  selector: 'stat-ship-wr',
  templateUrl: './stat-ship-wr.component.html'
})
export class StatShipWrComponent extends StatBaseComponent implements OnInit {

  public icon = faTrophy;

  constructor() {
    super(StatType.Wr, true);
  }

  ngOnInit(): void {
  }

}

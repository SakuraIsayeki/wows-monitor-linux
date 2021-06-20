import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { StatBaseComponent } from '@components/main/monitor/player/stat-base/stat-base.component';
import { faTrophy } from '@fortawesome/free-solid-svg-icons/faTrophy';
import { StatType } from '@generated/models/stat-type';

@Component({
  selector: 'stat-acc-wr',
  templateUrl: './stat-acc-wr.component.html'
})
export class StatAccWrComponent extends StatBaseComponent implements OnInit {

  public icon = faTrophy;

  constructor() {
    super(StatType.AccWr);
  }

  ngOnInit(): void {
  }

}

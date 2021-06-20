import { Component, OnInit } from '@angular/core';
import { StatBaseComponent } from '@components/main/monitor/player/stat-base/stat-base.component';
import { faGavel } from '@fortawesome/free-solid-svg-icons/faGavel';
import { StatType } from '@generated/models/stat-type';

@Component({
  selector: 'stat-acc-battles',
  templateUrl: './stat-acc-battles.component.html'
})
export class StatAccBattlesComponent extends StatBaseComponent implements OnInit {

  public icon = faGavel;

  constructor() {
    super(StatType.AccBattles);
  }

  ngOnInit(): void {
  }

}

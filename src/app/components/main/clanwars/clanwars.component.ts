import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Region } from 'src/app/interfaces/region';

@Component({
  selector: 'app-clanwars',
  templateUrl: './clanwars.component.html'
})
export class ClanwarsComponent implements OnInit {

  regionOptions: SelectItem[] = [
    {
      label: Region.EU.toString(),
      value: Region.EU
    },
    {
      label: Region.NA.toString(),
      value: Region.NA
    },
    {
      label: Region.RU.toString(),
      value: Region.RU
    },
    {
      label: Region.ASIA.toString(),
      value: Region.ASIA
    }
  ];

  divisionOptions: SelectItem[] = [
    {
      label: '1',
      value: 1
    },
    {
      label: '2',
      value: 2
    },
    {
      label: '3',
      value: 3
    }
  ];

  leagueOptions: SelectItem[] = [
    {
      label: '0',
      value: 0
    },
    {
      label: '1',
      value: 1
    },
    {
      label: '2',
      value: 2
    },
    {
      label: '3',
      value: 3
    },
    {
      label: '4',
      value: 4
    }
  ];

  teamOptions: SelectItem[] = [
    {
      label: '1',
      value: '1'
    },
    {
      label: '2',
      value: 2
    }
  ];

  seasonOptions: SelectItem[] = [
    {
      label: '1',
      value: 1
    },
    {
      label: '2',
      value: 2
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}

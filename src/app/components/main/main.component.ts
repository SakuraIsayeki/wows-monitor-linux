import { Component, OnInit, Inject } from '@angular/core';
import { BaseComponent } from '../base.component';
import { UpdateServiceToken, UpdateService } from 'src/app/interfaces/update.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent extends BaseComponent implements OnInit {

  constructor(@Inject(UpdateServiceToken) public updateService: UpdateService) {
    super();
  }

  ngOnInit() {
  }

}

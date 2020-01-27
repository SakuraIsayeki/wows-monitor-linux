import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseComponent } from 'src/app/components/base.component';

@Component({
  selector: 'app-favorite-input',
  templateUrl: './favorite-input.component.html'
})
export class FavoriteInputComponent extends BaseComponent implements OnInit {

  @Input()
  control: FormControl;

  array = [];

  constructor() {
    super();
  }

  ngOnInit() {
    this.array = this.control.value;
  }

  clanSelected(id: number) {
    if (!this.array.includes(id)) {
      this.array.push(id);
      this.control.setValue([...this.array], { emitEvent: true });
      this.array = [...this.array];
    }
  }

  clanRemoved(event: any) {
    let id = event.value.id;
    if (this.array.includes(id)) {
      const index = this.array.indexOf(id);
      this.array.splice(index, 1);
      this.control.setValue([...this.array], { emitEvent: true });
      this.array = [...this.array];
    }
  }
}
